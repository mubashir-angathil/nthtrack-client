/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import projectServices from "../../../services/project-services/ProjectServices";
import { Params, useParams } from "react-router-dom";
import { ApiError } from "../../../services/Helper";
import {
  GetTaskByIdResponse,
  StatusInterface,
  UpdateTaskRequest,
} from "../../../services/project-services/Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { enqueueSnackbar } from "notistack";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../../components/common/alert/Helper";
import useSocketHelpers from "../../../socket/Socket";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import { LabelAutocompleteOptionType } from "../../../services/data-services/Helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, array, number, object, string } from "yup";
import ManageTaskForm from "../../../components/form/manage-task/ManageTaskForm";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";

interface UpdateTaskInput {
  task?: string;
  description?: string;
  label?: LabelAutocompleteOptionType;
  status?: StatusInterface;
}

// Define the validation schema for the sign-in form
export const manageTaskFormSchema = object({
  labelId: number(),
  statusId: number(),
  task: string(),
  description: string().min(2).max(500),
  assignees: array().default([]),
});

// Define the type for the form inputs based on the schema
export type ManageTaskFormInput = InferType<typeof manageTaskFormSchema>;

export const useTask = () => {
  const params: Params = useParams();
  const { pushNotification } = useSocketHelpers();
  const { setAlert } = useAlertContext();
  const { setDialog } = useDialogContext();
  const { handleCloseAlert } = useAlert();
  const { project } = useProjectContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [task, setTask] = useState<GetTaskByIdResponse["data"] | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Initialize the React Hook Form with validation resolver and default values
  const { control, watch, setValue, reset, resetField } =
    useForm<ManageTaskFormInput>({
      resolver: yupResolver(manageTaskFormSchema),
    });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handelSetFormValues = ({
    key,
    value,
  }: {
    key: "task" | "label" | "status" | "description";
    value: string | number;
  }) => {
    if (key === "label" || key === "status") {
      setValue(`${key}Id`, value as number);
    } else if (key === "description" || key === "task") {
      setValue(key, value as string);
    }
  };

  // handler to update the task
  const handleTaskUpdate = async (updatedValues: UpdateTaskInput) => {
    setAlert({
      open: true,
      alert: {
        title: "Confirm the changes",
        message: "Do you confirm the to made this change on this",
        negativeButton: "Cancel",
        positiveButton: "Confirm",
        response: async (response) => {
          if (response === "accept" && project && task) {
            await updateTaskById({
              ...updatedValues,
              labelId: updatedValues?.label
                ? updatedValues.label.id
                : undefined,
              statusId: updatedValues?.status
                ? updatedValues.status.id
                : undefined,
              projectId: project.id,
              taskId: task.id,
            });
          } else {
            reset();
          }
          handleCloseAlert();
        },
      },
    });
  };

  // Handler to delete the task
  const handleDeleteTask = () => {
    setAlert({
      open: true,
      alert: {
        title: "Delete This Task",
        message:
          "Once you delete a task, there is no going back.Please be certain.",
        positiveButton: "Accept",
        negativeButton: "Cancel",
        response: async (res) => {
          if (res === "accept" && task?.id && project) {
            handleCloseAlert();
            await deleteTask({
              projectId: project.id,
              taskId: task.id,
            });
          }
        },
      },
    });
  };

  // controller to get the task
  const fetchTaskById = async ({
    taskId,
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getTasksById({
        taskId,
        projectId,
      });

      const {
        status,
        data: { data, message, success },
      } = response;
      // If the API call is successful, update project details
      if (status === 200 && success) {
        setTask(data);
      } else {
        // If there's an error, log the error message
        throw { data: message };
      }
    } catch (error) {
      // Handle API errors
      const { data } = error as ApiError;

      enqueueSnackbar({
        message: data?.message,
        variant: "error",
      });
    }
  };

  // Controller for delete the task
  const deleteTask = async ({
    taskId,
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      const response = await projectServices.deleteTask({
        projectId,
        taskId,
      });
      if (response.status === 200 && response.data.success) {
        pushNotification({
          broadcastId: projectId,
          message: `:author deleted the project ${project?.name}'s task ${taskId}`,
        });
        enqueueSnackbar({
          message: response.data.message,
          variant: "success",
        });
        generalFunctions.goBack();
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const { data } = error as ApiError;

      if (data.success === false) {
        enqueueSnackbar({
          message: data.message,
          variant: "error",
        });
      }
    }
  };

  // Controller to update the task
  const updateTaskById = async (props: UpdateTaskRequest) => {
    try {
      const response = await projectServices.updateTask(props);
      if (response.status === 200 && response.data.success) {
        await fetchTaskById({
          projectId: props.projectId,
          taskId: props.taskId,
        });
        reset();
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
    }
  };

  const handleTaskFormUpdate = () => {
    setDialog({
      open: true,
      form: {
        title: "Update Task",
        body: <ManageTaskForm values={task} setRefresh={setRefresh} />,
      },
    });
  };

  // useEffect to fetch task initially
  useEffect(() => {
    const taskId = params?.taskId && parseInt(params.taskId);
    if (project && taskId) {
      fetchTaskById({ projectId: project.id, taskId });
    }
  }, [project, refresh]);

  return {
    task,
    control,
    open,
    anchorEl,
    watch,
    resetField,
    handleMenuClose,
    handleMenuOpen,
    handelSetFormValues,
    handleTaskUpdate,
    handleTaskFormUpdate,
    handleDeleteTask,
  };
};
