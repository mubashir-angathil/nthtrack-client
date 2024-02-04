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
import { usePermissionHook } from "../../../../utils/helpers/hooks/ValidatePermission";
import { useUserPermissionContext } from "../../../../utils/helpers/context/user-permission-context/UserPermissionContext";
import { permissionJSON } from "../../../../utils/helpers/constants/Constants";
import { useComponentPermissionContext } from "../../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";
import { useUserPermissionHelpers } from "../../../../utils/helpers/context/user-permission-context/Helper";

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
  const { validatePermissionWithPermissionJSON } = usePermissionHook();
  const { permission } = useUserPermissionContext();
  const { componentPermission, setComponentPermission } =
    useComponentPermissionContext();
  const { fetchUserProjectPermission } = useUserPermissionHelpers();

  const [projectMembers, setProjectMembers] = useState<
    GetProjectMemberResponse["data"]
  >([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Function to handle opening the menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null); // Reset the anchor element to close the menu
  };

  // Function to handle updating the project
  const handleUpdateProject = () => {
    // Navigate to the update project route if available
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

  // Function to handle navigation to project settings
  const handleSettingsNavigation = () => {
    // Navigate to the project settings route with project information
    navigate(routes.projectSettings.path, {
      state: {
        project: { id: project?.id, name: project?.name },
      },
    });
  };

  // useEffect to fetch project-related data on component mount
  useEffect(() => {
    // Extract projectId from params or set it to null
    const projectId = params?.projectId ? parseInt(params?.projectId) : null;
    // setProject(null);
    // Check if projectId is available
    if (projectId) {
      // Fetch project details only if the project state is null
      // if (project === null)
      fetchProjectById({ projectId });

      // Fetch project members, and user project permissions
      Promise.all([
        fetchProjectMembers({ projectId }),
        fetchUserProjectPermission({ projectId }),
      ]);
    }
  }, []);

  // useEffect to validate and update component permissions based on received permission
  useEffect(() => {
    // Check if permission is available
    if (permission) {
      // Validate and set component permissions based on permission and permissionJSON
      const newPermission = validatePermissionWithPermissionJSON({
        permission: permission.permission.json,
        permissionJSON,
      });
      setComponentPermission(newPermission);
    }
  }, [permission]);

  return {
    project,
    open,
    anchorEl,
    componentPermission,
    handleSettingsNavigation,
    handleMenuOpen,
    handleMenuClose,
    projectMembers,
    handleUpdateProject,
  };
};
