/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  NavigateFunction,
  useNavigate,
  Params,
  useParams,
} from "react-router-dom";
import { ApiError } from "../../../../services/Helper";
import routes from "../../../../utils/helpers/routes/Routes";
import { enqueueSnackbar } from "notistack";

import dataServices from "../../../../services/data-services/DataServices";
import {
  GetProjectMemberRequest,
  GetProjectMemberResponse,
} from "../../../../services/data-services/Helper";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";
import { useProjectContextHelpers } from "../../../../utils/helpers/context/project-context/Helper";

// Define the shape of the API configuration

/**
 * Custom React hook for managing project view state and logic.
 * Handles fetching project details, tasks, and search functionality.
 */
export const useViewProject = () => {
  // Extract necessary parameters and functions from React Router
  const params: Params = useParams();
  const navigate: NavigateFunction = useNavigate();
  const { project } = useProjectContext();
  const { fetchProjectById } = useProjectContextHelpers();
  const [projectMembers, setProjectMembers] = useState<
    GetProjectMemberResponse["data"]
  >([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateProject = () => {
    if (routes.projects.update?.path) {
      navigate(routes.projects.update.path);
    }
  };

  // Function to fetch teams from the API
  const fetchProjectMembers = async ({
    projectId,
  }: GetProjectMemberRequest) => {
    try {
      // Call the API to get projects based on the current API configuration
      const response = await dataServices.getProjectMembers({ projectId });
      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update projects and API configuration
      if (status === 200 && success) {
        setProjectMembers(data);
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

  // Function to navigate to settings
  const handleSettingsNavigation = () => {
    navigate(routes.projectSettings.path, {
      state: {
        project: { id: project?.id, name: project?.name },
      },
    });
  };

  useEffect(() => {
    const projectId = params?.projectId ? parseInt(params?.projectId) : null;
    if (projectId) {
      fetchProjectMembers({ projectId });
      fetchProjectById({ projectId });
    }
  }, []);

  return {
    project,
    open,
    anchorEl,
    handleSettingsNavigation,
    handleMenuOpen,
    handleMenuClose,
    projectMembers,
    handleUpdateProject,
  };
};
