import { useEffect, useState } from "react";
import { useAlertContext } from "../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../common/alert/Helper";
import { useDialogContext } from "../../utils/helpers/context/dialog-context/DialogContext";
import useSocketHelpers from "../../socket/Socket";
import { useProjectContext } from "../../utils/helpers/context/project-context/ProjectContext";
import { useProjectContextHelpers } from "../../utils/helpers/context/project-context/Helper";
import DeleteProject from "../form/delete-project/DeleteProject";
import projectServices from "../../services/project-services/ProjectServices";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../services/Helper";
import { PermissionJSONType } from "../../utils/helpers/constants/Constants";
import { useComponentPermissionContext } from "../../utils/helpers/context/component-permission-context/ComponentPermissionContext";

export interface PanelInterface {
  label: string;
  component: JSX.Element;
}

export interface DangerZoneItemInterface {
  title: string;
  handler: () => void;
  button: string;
}

export const useDangerZoneSection = () => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setDialog } = useDialogContext();
  const { pushNotification } = useSocketHelpers();
  const { project } = useProjectContext();
  const { fetchProjectById } = useProjectContextHelpers();
  const { componentPermission } = useComponentPermissionContext();

  // Array of items for the danger zone (e.g., reopening, closing, deleting projects)
  const [dangerZoneItems, setDangerZoneItems] = useState<
    DangerZoneItemInterface[]
  >([]);

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

  // Array of Danger Zone items with corresponding titles, handlers, and button labels
  const dangerZoneFullItems: DangerZoneItemInterface[] = [
    {
      title: "Reopen this project",
      handler: handleReOpenProject,
      button: "Reopen project",
    },
    {
      title:
        "Close this project. Once closed, manipulation is not allowed without reopening.",
      handler: handleCloseProject,
      button: "Close project",
    },
    {
      title:
        "Delete this project. Deleting is irreversible. Please be certain.",
      handler: handleDeleteProject,
      button: "Delete project",
    },
  ];

  // Function to filter and build Danger Zone items based on the provided permission and project details
  const buildDangerZoneItems = (permission: PermissionJSONType) => {
    // Initialize an array to store updated Danger Zone items
    const updatedItems: DangerZoneItemInterface[] = [];

    // Iterate through each item in the full Danger Zone items list
    dangerZoneFullItems.forEach((item) => {
      // Check conditions based on the item's button label
      switch (true) {
        // Include "Delete project" if deleteProject permission is permitted
        case item.button === "Delete project":
          permission["deleteProject"]?.permitted && updatedItems.push(item);
          break;

        // Include "Close project" if updateProject permission is permitted and project is open
        case item.button === "Close project":
          permission["updateProject"]?.permitted &&
            project?.closedAt === null &&
            updatedItems.push(item);
          break;

        // Include "Reopen project" if updateProject permission is permitted and project is closed
        case item.button === "Reopen project":
          permission["updateProject"]?.permitted &&
            project?.closedAt !== null &&
            updatedItems.push(item);
          break;
      }
    });

    // Return the updated array of Danger Zone items
    return updatedItems;
  };

  // useEffect to update Danger Zone items based on component permissions
  useEffect(() => {
    // Check if componentPermission is available
    if (componentPermission) {
      // Build updated Danger Zone items based on the component permissions
      const updatedItems = buildDangerZoneItems(componentPermission);

      // Set the updated Danger Zone items in the state
      setDangerZoneItems(updatedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentPermission]);

  return {
    dangerZoneItems,
  };
};
