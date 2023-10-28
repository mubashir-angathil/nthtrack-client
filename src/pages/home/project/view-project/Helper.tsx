/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useState } from "react";
import projectServices from "../../../../services/project-services/ProjectServices";
import {
  Location,
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  GetAllTasksRequest,
  GetProjectByIdResponse,
  TaskResponse,
} from "../../../../services/project-services/Helper";
import { ApiError } from "../../../../services/Helper";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import routes from "../../../../utils/helpers/routes/Routes";
import { debounce } from "@mui/material";
import { DialogContextProps } from "../../../../utils/helpers/context/dialog-context/Helper";
import ManageTaskForm from "../../../../components/form/manage-task/ManageTaskForm";
import { enqueueSnackbar } from "notistack";
import { number, object, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export const filterFormSchema = object({
  trackerId: number(),
  statusId: number(),
});

export type FilterInput = InferType<typeof filterFormSchema>;
// Define the shape of the API configuration
interface ApiConfig extends GetAllTasksRequest {
  hasMore: boolean;
}

/**
 * Custom React hook for managing project view state and logic.
 * Handles fetching project details, tasks, and search functionality.
 */
export const useViewProject = () => {
  // Extract necessary parameters and functions from React Router
  const params: Params = useParams();
  const location: Location = useLocation();

  const navigate: NavigateFunction = useNavigate();
  const initialApiConfig = {
    limit: 5,
    page: 1,
    hasMore: true,
    trackerId: undefined,
    statusId: undefined,
    searchKey: undefined,
    projectId: params?.id ? parseInt(params.id) : 0,
  };
  const { control, watch } = useForm({
    resolver: yupResolver<FilterInput>(filterFormSchema),
  });

  // State variables for project and tasks, as well as API configuration
  const [project, setProject] = useState<GetProjectByIdResponse["data"]>({
    id: 0,
    projectName: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    closedAt: "",
  });
  const [tasks, setTasks] = useState<TaskResponse["data"]>([]);
  const [apiConfig, setApiConfig] = useState<ApiConfig>(initialApiConfig);

  const dialog: DialogContextProps["dialog"] = {
    open: true,
    form: {
      title: "New Task",
      body: <ManageTaskForm />,
    },
  };

  // Debounced search function to handle search input changes
  const handleSearch = debounce((value: string) => {
    // Clear tasks if the search value is undefined
    if (apiConfig.searchKey === undefined) {
      setTasks([]);
    }

    // Update API configuration with the new search value
    setApiConfig((prevConfig) => ({
      ...prevConfig,
      page: 1,
      hasMore: true,
      searchKey: value === "" ? undefined : value,
    }));
  }, 1500);

  // Event handler for handling input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Trigger the debounced search function
    handleSearch(value);
  };

  // Event handler for clearing search
  const handleSearchClear = () => {
    const taskSearchField = document.getElementById(
      "task-search-field",
    ) as HTMLInputElement;

    // Set the value of the search field to an empty string
    if (taskSearchField) {
      taskSearchField.value = "";

      // Clear tasks
      setTasks([]);

      // Update API configuration with the new search value
      setApiConfig((prevConfig) => ({
        ...prevConfig,
        page: 1,
        hasMore: true,
        searchKey: undefined,
      }));
    }
  };

  // Event handler for handling task loading (e.g., on scroll)
  const handleTaskLoading = (e: SyntheticEvent) => {
    const loadMore = generalFunctions.batchLoading(e);

    // If there's more to load and the API configuration allows it, update the page number
    if (loadMore && apiConfig.hasMore) {
      setApiConfig((prevConfig) => ({
        ...prevConfig,
        page: prevConfig.page + 1,
      }));
    }
  };

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      // Call the API to get tasks based on the current API configuration
      const response = await projectServices.getAllTasks(apiConfig);
      const {
        status,
        data: { data, message, success, totalRows },
      } = response;

      // If the API call is successful, update tasks and API configuration
      if (status === 200 && success) {
        setTasks((prevTasks) => {
          const newTasks = apiConfig.page === 1 ? data : prevTasks.concat(data);
          return newTasks;
        });
        setApiConfig((prevConfig) => ({
          ...prevConfig,
          hasMore: totalRows > tasks.length + data.length,
        }));
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

  // Function to fetch project details from the API
  const fetchProjectById = async () => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getProjectById({
        projectId: apiConfig.projectId,
      });

      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update project details
      if (status === 200 && success) {
        setProject(data);
      } else {
        // If there's an error, log the error message
        throw { data: message };
      }
    } catch (error) {
      // Handle API errors
      const { data } = error as ApiError;
      console.error(data);
    }
  };

  const fetchCloseProjectById = async () => {
    try {
      const project = await projectServices.closeProjectById({
        projectId: apiConfig.projectId,
      });

      if (project.status === 200 && project.data.success) {
        alert(project.data.message);
      } else {
        throw generalFunctions.customError(project as any);
      }
    } catch (error) {
      const { data } = error as ApiError;
      if (!data.success) {
        alert(data.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (apiConfig.hasMore) {
      fetchTasks();
    }
  }, [
    apiConfig.page,
    apiConfig.searchKey,
    apiConfig.trackerId,
    apiConfig.statusId,
  ]);

  useEffect(() => {
    // console.log(apiConfig);
    if (apiConfig.projectId === 0) {
      navigate(routes.projects.path, { replace: true });
    } else {
      location.state = { projectId: params.id };
    }

    fetchProjectById();
  }, []);

  useEffect(() => {
    const trackerId = watch("trackerId");
    const statusId = watch("statusId");
    if (trackerId > 0 || statusId > 0) {
      setTasks([]);
      setApiConfig((apiConfig) => {
        return {
          ...apiConfig,
          hasMore: true,
          page: 1,
          trackerId: trackerId > 0 ? trackerId : undefined,
          statusId: statusId > 0 ? statusId : undefined,
        };
      });
    } else setApiConfig(initialApiConfig);
  }, [watch("trackerId"), watch("statusId")]);
  return {
    project,
    tasks,
    dialog,
    control,
    apiConfig,
    fetchTasks,
    fetchCloseProjectById,
    handleTaskLoading,
    handleSearchClear,
    handleChange,
  };
};
