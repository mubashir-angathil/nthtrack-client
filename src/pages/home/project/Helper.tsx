import { SyntheticEvent, useEffect, useState } from "react";
import { ApiError } from "../../../services/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import { debounce } from "@mui/material";
import {
  ApiRequestWithPaginationAndSearch,
  ProjectsResponse,
} from "../../../services/project-services/Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import { DialogContextProps } from "../../../utils/helpers/context/dialog-context/Helper";
import ManageProjectForm from "../../../components/form/manage-project/ManageProjectForm";

// Define the shape of the API configuration
interface ApiConfig extends ApiRequestWithPaginationAndSearch {
  hasMore: boolean;
}

// Custom hook for managing projects
export const useProjects = () => {
  // State for storing projects and API configuration
  const [projects, setProjects] = useState<ProjectsResponse["data"]>([]);
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    page: 1,
    limit: 4,
    hasMore: true,
    searchKey: undefined,
  });

  // Access Dialog context for opening the Dialog
  const { setDialog } = useDialogContext();

  const dialog: DialogContextProps["dialog"] = {
    open: true,
    form: {
      title: "New Project",
      body: <ManageProjectForm />,
    },
    positiveButton: "Create Project",
  };

  // Debounced search function to handle search input changes
  const handleSearch = debounce((value: string) => {
    // Clear projects if the search value is empty
    if (apiConfig.searchKey === undefined) {
      setProjects([]);
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
  const handleClear = () => {
    const projectSearchField = document.getElementById(
      "project-search-field",
    ) as HTMLInputElement;

    // Set the value of the search field to an empty string
    if (projectSearchField) {
      projectSearchField.value = "";

      // Clear projects
      setProjects([]);

      // Update API configuration with the new search value
      setApiConfig((prevConfig) => ({
        ...prevConfig,
        page: 1,
        hasMore: true,
        searchKey: undefined,
      }));
    }
  };

  // Function to fetch projects from the API
  const fetchProjects = async () => {
    try {
      // Call the API to get projects based on the current API configuration
      const response = await projectServices.getAllProjects(apiConfig);
      const {
        status,
        data: { data, message, success, totalRows },
      } = response;

      // If the API call is successful, update projects and API configuration
      if (status === 200 && success) {
        setProjects((prevProjects) => prevProjects.concat(data));
        setApiConfig((prevConfig) => ({
          ...prevConfig,
          hasMore: totalRows > projects.length + data.length,
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

  // Event handler for handling project loading (e.g., on scroll)
  const handleProjectLoading = (e: SyntheticEvent) => {
    const loadMore = generalFunctions.batchLoading(e);

    // If there's more to load and the API configuration allows it, update the page number
    if (loadMore && apiConfig.hasMore) {
      setApiConfig((prevConfig) => ({
        ...prevConfig,
        page: prevConfig.page + 1,
      }));
    }
  };

  // Effect to fetch projects when the API configuration changes
  useEffect(() => {
    if (apiConfig.hasMore) {
      fetchProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiConfig.page, apiConfig.searchKey]);

  // Return the necessary values and functions for component usage
  return {
    dialog,
    setDialog,
    projects,
    apiConfig,
    handleChange,
    handleClear,
    handleProjectLoading,
  };
};