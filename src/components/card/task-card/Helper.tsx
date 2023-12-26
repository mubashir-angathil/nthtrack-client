/* eslint-disable react-hooks/exhaustive-deps */
import { useDeferredValue, useMemo, useState } from "react";
import projectServices from "../../../services/project-services/ProjectServices";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ApiError } from "../../../services/Helper";
import { enqueueSnackbar } from "notistack";
import { number, object, InferType, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "@mui/material";
import {
  GetAllTasksRequest,
  Project,
  StatusInterface,
  TaskResponse,
} from "../../../services/project-services/Helper";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import ManageTaskForm from "../../form/manage-task/ManageTaskForm";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import ManageStatusForm from "../../form/manage-status/ManageStatusForm";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../common/alert/Helper";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";

// Define the form schema for filtering tasks
export const filterFormSchema = object({
  labelId: number(),
  searchKey: string(),
});

// Infer the type from the form schema for filtering tasks
export type FilterInput = InferType<typeof filterFormSchema>;

// Define the structure of task details
export declare type TaskDetailsType = {
  [status: string]: {
    page: number;
    statusId: number;
    hasMore: boolean;
    totalRows: number;
    tasks: TaskResponse["data"];
  };
};

// Custom hook for the task component
export const useTaskComponent = () => {
  // React hooks and context
  const navigate: NavigateFunction = useNavigate();
  const { project, setProject } = useProjectContext();
  const differedProject = useDeferredValue(project);
  const { setDialog } = useDialogContext();
  const { setModal } = useModalContext();
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();

  // State and form control
  const [selectedTaskId, setSelectedTaskId] = useState<number>();
  const [activeStatus, setActiveStatus] = useState<
    Project["statuses"][0] | null
  >(null);
  const [search, setSearch] = useState<string>();
  const [tasks, setTasks] = useState<TaskResponse["data"]>({});
  const differedTasks = useDeferredValue(tasks);
  const [anchorElTaskMenu, setAnchorElTaskMenu] = useState<null | HTMLElement>(
    null,
  );
  const [anchorElStatusMenu, setAnchorElStatusMenu] =
    useState<null | HTMLElement>(null);
  const { getValues, control, watch, register } = useForm({
    resolver: yupResolver<FilterInput>(filterFormSchema),
  });

  // Function to handle opening the task menu
  const handleOpenTaskMenu = (
    event: React.MouseEvent<HTMLElement>,
    taskId: number,
    status: { id: number; name: string; color: string },
  ) => {
    setAnchorElTaskMenu(event.currentTarget);
    setSelectedTaskId(taskId);
    setActiveStatus(status);
  };

  // Function to handle closing the task menu
  const handleCloseTaskMenu = () => {
    setAnchorElTaskMenu(null);
  };

  // Function to handle opening the status menu
  const handleOpenStatusMenu = (
    event: React.MouseEvent<HTMLElement>,
    status: { id: number; name: string; color: string },
  ) => {
    setActiveStatus(status);
    setAnchorElStatusMenu(event.currentTarget);
  };

  // Function to handle closing the status menu based on the selected action
  const handleCloseStatusMenu = (action: "Manage status" | "Delete status") => {
    setAnchorElStatusMenu(null);
    if (action === "Delete status") {
      handleDeleteStatus();
    } else if (action === "Manage status") {
      handleUpdateStatus();
    }
    setActiveStatus(null);
  };

  // Debounced search function to handle search input changes
  const handleSearch = debounce((value: string) => {
    setSearch(value === "" ? undefined : value);
  }, 1500);

  // Event handler for handling input changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    // Trigger the debounced search function
    handleSearch(value);
  };

  // Event handler for clearing the search
  const handleSearchClear = () => {
    const taskSearchField = document.getElementById(
      "task-search-field",
    ) as HTMLInputElement;

    // Set the value of the search field to an empty string
    if (taskSearchField) {
      taskSearchField.value = "";

      // Clear tasks
      setTasks({});

      // Update API configuration with the new search value
      setSearch(undefined);
    }
  };

  // Function to create a new task
  const handleCreateTask = (status: Project["statuses"][0]) => {
    setDialog({
      open: true,
      form: {
        title: "New Task",
        body: <ManageTaskForm activeStatus={status} setTasks={setTasks} />,
      },
    });
  };

  // Function to delete a task
  const handleDeleteTask = async () => {
    handleCloseTaskMenu();
    if (selectedTaskId && project) {
      await deleteTasks({
        taskId: selectedTaskId,
        projectId: project.id,
      });
    }
  };

  // Function to delete a status
  const handleDeleteStatus = async () => {
    setAlert({
      open: true,
      alert: {
        title: "Drop Status",
        message:
          "Do you want to delete it? No backtracking, all tasks under this status will be deleted",
        negativeButton: "Cancel",
        positiveButton: "Confirm",
        response: (response) => {
          if (response === "accept") {
            if (project && activeStatus) {
              deleteStatus({
                projectId: project.id,
                statusId: activeStatus.id,
              });
            } else {
              enqueueSnackbar({
                message: "Something went wrong, please go back and try again",
                variant: "warning",
              });
            }
          }
        },
      },
    });
  };

  // Function to update a status
  const handleUpdateStatus = async () => {
    if (activeStatus) {
      setModal({
        open: true,
        form: {
          title: "Update Status",
          body: <ManageStatusForm values={activeStatus} />,
        },
      });
    }
  };

  // Function to add a new status
  const handleAddNewStatus = () => {
    setModal({
      open: true,
      form: {
        title: "New Status",
        body: <ManageStatusForm />,
      },
    });
  };

  // Function to fetch tasks from the API
  const fetchTasks = async ({
    projectId,
    labelId,
    searchKey,
  }: GetAllTasksRequest) => {
    try {
      // Call the API to get tasks based on the current API configuration
      const response = await projectServices.getAllTasks({
        projectId,
        labelId,
        searchKey,
      });
      const {
        data: { data, message, success },
      } = response;

      // If the API call is successful, update tasks and API configuration
      if (response.status === 200 && success) {
        setTasks(data);
      } else {
        // If there's an error, log the error message
        throw { data: message };
      }
    } catch (error: any) {
      let message = error.message ?? "Something went wrong!";

      // Handle API errors
      const { data } = error as ApiError;
      if (data.success && data.message) {
        message = data.message;
      }

      enqueueSnackbar({
        message: message,
        variant: "error",
      });
    }
  };

  // Function to delete a task from the API
  const deleteTasks = async ({
    taskId,
    projectId,
  }: {
    projectId: number;
    taskId: number;
  }) => {
    try {
      // Call the API to delete a task
      const response = await projectServices.deleteTask({ projectId, taskId });
      const {
        status,
        data: { message, success },
      } = response;

      // If the API call is successful, update tasks and API configuration
      if (status === 200 && success) {
        setTasks((prevTasks) => {
          if (activeStatus) {
            const newTask = prevTasks[activeStatus.name].filter(
              (task) => task.id !== taskId,
            );
            return {
              ...prevTasks,
              [activeStatus?.name]: newTask,
            };
          }
          return prevTasks;
        });
        enqueueSnackbar({ message, variant: "success" });
      } else {
        // If there's an error, log the error message
        throw Error(message);
      }
    } catch (error: any) {
      let message = error.message ?? "Something went wrong!";

      // Handle API errors
      const { data } = error as ApiError;
      if (data.success && data.message) {
        message = data.message;
      }

      enqueueSnackbar({
        message: message,
        variant: "error",
      });
    }
  };

  // Function to delete a status from the API
  const deleteStatus = async ({
    statusId,
    projectId,
  }: {
    projectId: number;
    statusId: number;
  }) => {
    try {
      // Call the API to delete a status
      const response = await projectServices.deleteStatus({
        projectId,
        statusId,
      });
      const {
        status,
        data: { message, success },
      } = response;

      handleCloseAlert();
      // If the API call is successful, update tasks and API configuration
      if (status === 200 && success) {
        setProject((prevProject) => {
          if (prevProject) {
            const newStatus = prevProject?.statuses.filter(
              (status: StatusInterface) => activeStatus?.id !== status.id,
            );
            return { ...prevProject, statuses: newStatus };
          }
          return null;
        });
      } else {
        // If there's an error, log the error message
        throw Error(message);
      }
    } catch (error: any) {
      let message = error.message ?? "Something went wrong!";

      // Handle API errors
      const { data } = error as ApiError;
      if (data.success && data.message) {
        message = data.message;
      }

      enqueueSnackbar({
        message: message,
        variant: "error",
      });
    }
  };

  // Use memoization to fetch tasks when dependencies change
  useMemo(() => {
    if (project) {
      const labelId = getValues("labelId");
      fetchTasks({
        projectId: project.id,
        searchKey: search,
        labelId: labelId === -1 ? undefined : labelId,
      });
    }
  }, [differedProject, search, watch("labelId")]);

  return {
    project,
    navigate,
    register,
    control,
    search,
    tasks: differedTasks,
    handleChange,
    handleAddNewStatus,
    setSelectedTaskId,
    anchorElTaskMenu,
    anchorElStatusMenu,
    handleDeleteTask,
    handleCloseStatusMenu,
    handleOpenStatusMenu,
    handleOpenTaskMenu,
    handleCloseTaskMenu,
    handleCreateTask,
    handleSearchClear,
  };
};
