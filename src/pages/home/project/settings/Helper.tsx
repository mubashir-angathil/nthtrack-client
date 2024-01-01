import { useState } from "react";
import { useDialogContext } from "../../../../utils/helpers/context/dialog-context/DialogContext";
import projectServices from "../../../../services/project-services/ProjectServices";
import { useAlert } from "../../../../components/common/alert/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../services/Helper";
import DeleteProject from "../../../../components/form/delete-project/DeleteProject";
import useSocketHelpers from "../../../../socket/Socket";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";
import { useAlertContext } from "../../../../utils/helpers/context/alert-context/AlertContext";

export const useManageProjectSettings = () => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setDialog } = useDialogContext();
  const { pushNotification } = useSocketHelpers();
  const { project, setProject } = useProjectContext();
  const [tab, setTab] = useState("1");

  // Function to handle tab changes
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  // Function to handle project deletion
  const handleDeleteProject = () => {
    // Showing a dialog to confirm project deletion
    if (project) {
      setDialog({
        open: true,
        form: {
          title: "Drop Project",
          body: <DeleteProject />,
        },
      });
    }
  };

  // Function to handle closing a project
  const handleCloseProject = () => {
    // Display an alert to confirm closing the project
    setAlert({
      open: true,
      alert: {
        title: "Close Project",
        message: "Are you sure?",
        positiveButton: "Accept",
        negativeButton: "Cancel",
        response: async (res) => {
          // If the user accepts and there's a valid project, close the project
          if (res === "accept" && project) {
            handleCloseAlert();
            await closeProjectById({ projectId: project.id });
          }
        },
      },
    });
  };

  // Function to handle reopening a project
  const handleReOpenProject = () => {
    // Display an alert to confirm reopening the project
    setAlert({
      open: true,
      alert: {
        title: "Reopen Project",
        message: "Are you sure?",
        positiveButton: "Accept",
        negativeButton: "Cancel",
        response: async (res) => {
          // If the user accepts, and there's a valid project ID, reopen the project
          if (res === "accept") {
            handleCloseAlert();
            if (project?.id) {
              await restoreClosedProject({ projectId: project.id });
            } else {
              // Show a warning if the project ID is missing
              enqueueSnackbar({
                message: "Project id is missing!! please try again",
                variant: "warning",
              });
            }
          }
        },
      },
    });
  };

  // Function to restore a closed project
  const restoreClosedProject = async ({ projectId }: { projectId: number }) => {
    try {
      // Call the API to restore a closed project
      const response = await projectServices.restoreClosedProject({
        projectId,
      });

      // If the restoration is successful, update notifications and project details
      if (response.status === 200 && response.data.success) {
        enqueueSnackbar({
          message: response.data.message,
          variant: "success",
        });
        if (project?.id) {
          pushNotification({
            broadcastId: projectId,
            message: `Project ${project?.name} is reopened by :author`,
          });
        }
        await fetchProjectById({ projectId });
      }
    } catch (error) {
      // Handle API errors during restoration
      const { data } = error as ApiError;
      if (data.success === false) {
        enqueueSnackbar({
          message: data.message,
          variant: "error",
        });
      }
    }
  };

  // Function to close a project by ID
  const closeProjectById = async ({ projectId }: { projectId: number }) => {
    try {
      // Call the API to close a project by ID
      const response = await projectServices.closeProjectById({
        projectId,
      });

      // If the project closure is successful, update notifications and project details
      if (response.status === 200 && response.data.success) {
        pushNotification({
          broadcastId: projectId,
          message: `Project ${project?.name} is closed by :author`,
        });
        enqueueSnackbar({
          message: response.data.message,
          variant: "success",
        });
        await fetchProjectById({ projectId });
      }
    } catch (error) {
      // Handle API errors during project closure
      const { data } = error as ApiError;
      if (data.success === false) {
        enqueueSnackbar({
          message: data.message,
          variant: "error",
        });
      }
    }
  };

  // Function to fetch project details by ID
  const fetchProjectById = async ({ projectId }: { projectId: number }) => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getProjectById({
        projectId,
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

  // Array of items for the danger zone (e.g., reopening, closing, deleting projects)
  const dangerZoneItems = [
    {
      title: " Reopen this project",
      handler: handleReOpenProject,
      button: "Reopen project",
      condition: project?.closedAt !== null,
    },
    {
      title:
        "Close this project. Once you close the project, you will not allowed any manipulation without re-open the project",
      handler: handleCloseProject,
      button: "Close project",
      condition: project?.closedAt === null,
    },
    {
      title:
        " Delete this project. Once you delete a project, there is no going back. Please be certain.",
      handler: handleDeleteProject,
      button: "Delete project",
      condition: true,
    },
  ];

  return {
    setDialog,
    handleTabChange,
    tab,
    dangerZoneItems,
  };
};
