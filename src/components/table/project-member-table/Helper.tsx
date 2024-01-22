/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { useEffect, useState } from "react";
import {
  ApiRequestWithPaginationAndSearch,
  GetProjectMembersRequest,
  GetProjectMembersResponse,
  RemoveMemberRequest,
  UpdateMemberRequest,
} from "../../../services/project-services/Helper";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../common/alert/Helper";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import { SelectFieldApiResponse } from "../../../services/data-services/Helper";
import { enqueueSnackbar } from "notistack";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import dataServices from "../../../services/data-services/DataServices";
import ManageProjectMember from "../../form/manage-project-member/ManageProjectMember";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import { useComponentPermissionContext } from "../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";
import { useRefreshContext } from "../../../utils/helpers/context/refresh-context/RefreshContext";

// Defining the interface for table data
interface TableData extends ApiRequestWithPaginationAndSearch {
  totalRows: number;
  members: GetProjectMembersResponse["data"] | [];
}

export interface ProjectMemberTableComponentProps {
  setReload: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
export const useManageProjectMembers = ({
  setReload,
}: ProjectMemberTableComponentProps) => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setDialog } = useDialogContext();
  const { project } = useProjectContext();
  const { refresh } = useRefreshContext();
  const [initialRender, setInitialRender] = useState<boolean>();

  const {
    authDetails: { user },
  } = useAuthContext();
  const { componentPermission } = useComponentPermissionContext();

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

  // Function to open dialog
  const handleOpenDialog = () =>
    setDialog({
      open: true,
      form: {
        body: <ManageProjectMember refresh={setTableLoading} />,
        title: "New Member",
      },
    });

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
      if (response.data.success && response.status === 200) {
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

      // If the API call is successful (status 200) and returns valid data,
      // update the permission options based on the response data.x

      if (response.data.success && response.status === 200) {
        // Extract permissions from the response data
        let permissions = response.data.data;

        // Check if the author is present in the member list as a "Super Admin"
        const isAuthorSuperAdmin = tableConfig.members.some(
          (member) => member.status === "Super Admin",
        );

        // If the author is a "Super Admin," filter out the corresponding permission option
        if (isAuthorSuperAdmin) {
          permissions = permissions.filter(
            (permission) => permission.name !== "Super Admin",
          );
        }

        // Update the state with the filtered permission options
        setPermissionOptions(permissions);
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
        // reload permission from parent
        if (props.userId === user?.id) {
          setReload((prevState) =>
            prevState === undefined ? true : !prevState,
          );
        }

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

  // useEffect to fetch members when project, limit, or page is updated
  useEffect(() => {
    if (project?.id) {
      Promise.all([
        fetchPermission(),
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

  // useEffect to handle component initialization and table loading on refresh
  useEffect(() => {
    // Check if refresh is not triggered and it's the initial render
    if (refresh.reload === false && initialRender === undefined) {
      setInitialRender(false); // Marking initial render as complete
    }

    // Check if refresh is triggered and it's not the initial render
    if (refresh.reload && !initialRender) {
      setTableLoading((prevState) =>
        prevState === undefined ? true : !prevState,
      ); // Toggle table loading state
    }
  }, [refresh]);

  return {
    tableConfig,
    permissionOptions,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePermissionChange,
    handleOpenDialog,
    handleRemoveMember,
    componentPermission,
  };
};
