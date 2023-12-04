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
import { Location, Params, useLocation, useParams } from "react-router-dom";
import { useDialogContext } from "../../../../utils/helpers/context/dialog-context/DialogContext";
import projectServices from "../../../../services/project-services/ProjectServices";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import dataServices from "../../../../services/data-services/DataServices";
import { SelectFieldApiResponse } from "../../../../services/data-services/Helper";
import { useAlertContext } from "../../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../../../components/common/alert/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../services/Helper";

interface TableData extends ApiRequestWithPaginationAndSearch {
  totalRows: number;
  members: GetProjectMembersResponse["data"] | [];
}

export const useManageProjectMembers = () => {
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const location: Location = useLocation();
  const params: Params = useParams();
  const { setDialog } = useDialogContext();

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
  const [projectId] = useState<number | null>(
    typeof params?.projectId === "string" ? parseInt(params?.projectId) : null,
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setTableConfig((prevConfig) => {
      return { ...prevConfig, page: newPage + 1 };
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTableConfig((prevConfig) => {
      return { ...prevConfig, limit: parseInt(event.target.value), page: 1 };
    });
  };

  const handlePermissionChange = ({
    memberId,
    userId,
    permissionId,
  }: {
    memberId: number;
    userId: number;
    permissionId: number;
  }) => {
    setAlert({
      open: true,
      alert: {
        title: "Update Permission",
        message: "Are you sure? Do you want to update the permission",
        positiveButton: "Confirm",
        negativeButton: "Cancel",
        response: async (click: string) => {
          handleCloseAlert();
          if (click === "accept" && projectId) {
            await updateMember({
              projectId,
              userId,
              memberId,
              permissionId: permissionId,
            });
          }
        },
      },
    });
  };

  const handleRemoveMember = async ({
    memberId,
    userId,
  }: {
    memberId: number;
    userId: number;
  }) => {
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
          if (click === "accept" && projectId) {
            await removeMember({
              projectId,
              memberId,
              userId,
            });
          }
        },
      },
    });
  };

  const fetchMembers = async ({
    projectId,
    limit,
    page,
  }: GetProjectMembersRequest) => {
    try {
      const response = await projectServices.getProjectMembers({
        projectId,
        limit,
        page,
      });
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
      throw error;
    }
  };
  const fetchPermission = async () => {
    try {
      const response = await dataServices.getPermissions();
      if (response.data.success) {
        setPermissionOptions(response.data.data);
      }
    } catch (error) {
      throw error;
    }
  };
  const updateMember = async (props: UpdateMemberRequest) => {
    try {
      const response = await projectServices.updateMember(props);
      const {
        data: { message, success },
      } = response;
      if (success) {
        setTableLoading(true);
        enqueueSnackbar({ message, variant: "success" });
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
    }
  };
  const removeMember = async (props: RemoveMemberRequest) => {
    try {
      const response = await projectServices.removeMember(props);
      const {
        data: { message, success },
      } = response;
      if (success) {
        setTableLoading(true);
        enqueueSnackbar({ message, variant: "success" });
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
    }
  };

  useEffect(() => {
    if (projectId) {
      location.state = { projectId };
    } else {
      generalFunctions.goBack();
    }
  }, [location, projectId]);

  useEffect(() => {
    if (projectId) {
      Promise.resolve([fetchPermission()]);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      Promise.resolve([
        fetchMembers({
          projectId,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [projectId, tableConfig.limit, tableConfig.page]);

  useEffect(() => {
    if (tableLoading && projectId) {
      setTableLoading(undefined);
      Promise.resolve([
        fetchMembers({
          projectId,
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
    handleRemoveMember,
  };
};
