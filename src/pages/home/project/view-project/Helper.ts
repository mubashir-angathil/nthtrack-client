/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useState } from "react";
import projectServices from "../../../../services/project-services/ProjectServices";
import {
  NavigateFunction,
  Params,
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
  const navigate: NavigateFunction = useNavigate();

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
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    limit: 5,
    page: 1,
    hasMore: true,
    trackerId: undefined,
    statusId: undefined,
    searchKey: undefined,
    projectId: params?.id ? parseInt(params.id) : 0,
  });

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
        setTasks((prevTasks) => prevTasks.concat(data));
        setApiConfig((prevConfig) => ({
          ...prevConfig,
          hasMore: totalRows > tasks.length + data.length,
        }));
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

  useEffect(() => {
    if (apiConfig.hasMore) {
      fetchTasks();
    }
  }, [apiConfig.page, apiConfig.searchKey]);

  useEffect(() => {
    if (apiConfig.projectId === 0) {
      navigate(routes.projects.path, { replace: true });
    }
    setTimeout(() => {
      fetchProjectById();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    project,
    tasks,
    apiConfig,
    fetchTasks,
    handleTaskLoading,
    handleSearchClear,
    handleChange,
  };
};
