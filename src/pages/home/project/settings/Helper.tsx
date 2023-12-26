/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { useEffect, useState } from "react";
import {
  ApiRequestWithPaginationAndSearch,
  GetProjectMembersRequest,
  GetProjectMembersResponse,
  RemoveMemberRequest,
  UpdateMemberRequest,
} from "../../../../services/project-services/Helper";
import { useDialogContext } from "../../../../utils/helpers/context/dialog-context/DialogContext";
import projectServices from "../../../../services/project-services/ProjectServices";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import dataServices from "../../../../services/data-services/DataServices";
import { SelectFieldApiResponse } from "../../../../services/data-services/Helper";
import { useAlertContext } from "../../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../../../components/common/alert/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../services/Helper";
import DeleteProject from "../../../../components/form/delete-project/DeleteProject";
import useSocketHelpers from "../../../../socket/Socket";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";

// Defining the interface for table data
interface TableData extends ApiRequestWithPaginationAndSearch {
  totalRows: number;
  members: GetProjectMembersResponse["data"] | [];
}
export const useManageProjectMembers = () => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setDialog } = useDialogContext();
  const { pushNotification } = useSocketHelpers();
  const { project, setProject } = useProjectContext();

  const [tableLoading, setTableLoading] = useState<boolean | undefined>(
    undefined,
  );
  const [permissionOptions, setPermissionOptions] = useState<
    SelectFieldApiResponse["data"]
  >([]);
  const [tableConfig, setTableConfig] = useState<TableData>({
    page: 1,
    limit: 5,
    totalRows: 0,
    members: [],
  });

  // Function to handle page change in the table
  const handleChangePage = (_: unknown, newPage: number) => {
    // Updating page in the table configuration state
    setTableConfig((prevConfig) => {
      return { ...prevConfig, page: newPage + 1 };
    });
  };

  // Function to handle rows per page change in the table
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Updating limit and resetting page in the table configuration state
    setTableConfig((prevConfig) => {
      return { ...prevConfig, limit: parseInt(event.target.value), page: 1 };
    });
  };

  // Function to handle permission change for a member
  const handlePermissionChange = ({
    memberId,
    userId,
    permissionId,
  }: {
    memberId: number;
    userId: number;
    permissionId: number;
  }) => {
    // Showing an alert to confirm the permission update
    setAlert({
      open: true,
      alert: {
        title: "Update Permission",
        message: "Are you sure? Do you want to update the permission",
        positiveButton: "Confirm",
        negativeButton: "Cancel",
        response: async (click: string) => {
          handleCloseAlert();
          if (click === "accept" && project?.id) {
            // Updating the member's permission
            await updateMember({
              projectId: project.id,
              userId,
              memberId,
              permissionId: permissionId,
            });
          }
        },
      },
    });
  };

  // Function to handle member removal
  const handleRemoveMember = async ({
    memberId,
    userId,
  }: {
    memberId: number;
    userId: number;
  }) => {
    // Showing an alert to confirm member removal
    setAlert({
      open: true,
      alert: {
        title: "Remove Member",
        message:
          "Are you sure? Do you want to remove member from this project?",
        positiveButton: "Confirm",
        negativeButton: "Cancel",
        response: async (click: string) => {
          handleCloseAlert();
          if (click === "accept" && project?.id) {
            // Removing the member from the project
            await removeMember({
              projectId: project.id,
              memberId,
              userId,
            });
          }
        },
      },
    });
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

  // Fetch project members based on the provided parameters
  const fetchMembers = async ({
    projectId,
    limit,
    page,
  }: GetProjectMembersRequest) => {
    try {
      // Call the projectServices API to get project members
      const response = await projectServices.getProjectMembers({
        projectId,
        limit,
        page,
      });

      // If the API call is successful, update the table configuration
      if (response.data.success) {
        setTableConfig((prevConfig) => {
          return {
            ...prevConfig,
            totalRows: response.data.totalRows,
            members: response.data.data,
          };
        });
      }
    } catch (error) {
      // Handle errors by throwing them
      throw error;
    }
  };

  // Fetch permissions and update the permission options
  const fetchPermission = async () => {
    try {
      // Call the dataServices API to get permissions
      const response = await dataServices.getPermissions();

      // If the API call is successful, update the permission options
      if (response.data.success) {
        setPermissionOptions(response.data.data);
      }
    } catch (error) {
      // Handle errors by throwing them
      throw error;
    }
  };

  // Update a project member based on the provided properties
  const updateMember = async (props: UpdateMemberRequest) => {
    try {
      // Call the projectServices API to update a project member
      const response = await projectServices.updateMember(props);

      // Destructure response data for ease of use
      const {
        data: { message, success },
      } = response;

      // If the update is successful, set table loading and show a success notification
      if (success) {
        setTableLoading(true);
        enqueueSnackbar({ message, variant: "success" });
      }
    } catch (error) {
      // Handle errors and show an error notification
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Remove a project member based on the provided properties
  const removeMember = async (props: RemoveMemberRequest) => {
    try {
      // Call the projectServices API to remove a project member
      const response = await projectServices.removeMember(props);

      // Destructure response data for ease of use
      const {
        data: { message, success },
      } = response;

      // If the removal is successful, set table loading and show a success notification
      if (success) {
        setTableLoading(true);
        enqueueSnackbar({ message, variant: "success" });
      }
    } catch (error) {
      // Handle errors and show an error notification
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
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

  // Initial useEffect to handle redirection if project ID is undefined
  useEffect(() => {
    if (project?.id === undefined) {
      generalFunctions.goBack();
    }
  }, [project]);

  // useEffect to fetch permission options when project is updated
  useEffect(() => {
    if (project) {
      Promise.resolve([fetchPermission()]);
    }
  }, [project]);

  // useEffect to fetch members when project, limit, or page is updated
  useEffect(() => {
    if (project?.id) {
      Promise.resolve([
        fetchMembers({
          projectId: project.id,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [project, tableConfig.limit, tableConfig.page]);

  // useEffect to handle table loading state and refetch members
  useEffect(() => {
    if (tableLoading && project?.id) {
      setTableLoading(undefined);
      Promise.resolve([
        fetchMembers({
          projectId: project.id,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [tableLoading]);

  return {
    tableConfig,
    permissionOptions,
    setTableLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePermissionChange,
    setDialog,
    dangerZoneItems,
    handleRemoveMember,
  };
};
