/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  ApiRequestWithPaginationAndSearch,
  GetProjectStatusesRequest,
  GetProjectStatusesResponse,
  RemoveStatusRequest,
} from "../../../services/project-services/Helper";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../common/alert/Helper";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import { StatusAutocompleteOptionType } from "../../../services/data-services/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import { enqueueSnackbar } from "notistack";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";
import ManageStatusForm from "../../form/manage-status/ManageStatusForm";

// Defining the interface for table data
interface TableData extends ApiRequestWithPaginationAndSearch {
  totalRows: number;
  statuses: GetProjectStatusesResponse["data"] | [];
}
export const useManageProjectStatuses = () => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setModal } = useModalContext();
  const { project } = useProjectContext();

  const [tableLoading, setTableLoading] = useState<boolean | undefined>(
    undefined,
  );

  const [tableConfig, setTableConfig] = useState<TableData>({
    page: 1,
    limit: 5,
    totalRows: 0,
    statuses: [],
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

  // Function to handle status removal
  const handleRemoveStatus = async ({ statusId }: { statusId: number }) => {
    // Showing an alert to confirm Status removal
    setAlert({
      open: true,
      alert: {
        title: "Remove Status",
        message:
          "Are you sure? Do you want to remove status from this project?",
        positiveButton: "Confirm",
        negativeButton: "Cancel",
        response: async (click: string) => {
          handleCloseAlert();
          if (click === "accept" && project?.id) {
            // Removing the Status from the project
            await removeStatus({
              projectId: project.id,
              statusId,
            });
          }
        },
      },
    });
  };

  // Function to handle status updates
  const handleUpdateStatus = async ({
    row,
  }: {
    row: StatusAutocompleteOptionType;
  }) => {
    setModal({
      open: true,
      form: {
        body: (
          <ManageStatusForm values={row} setTableLoading={setTableLoading} />
        ),
        title: "Update Status",
      },
    });
  };

  // Function to handle status creation
  const handleCreateStatus = () =>
    setModal({
      open: true,
      form: {
        body: <ManageStatusForm setTableLoading={setTableLoading} />,
        title: "New Status",
      },
    });

  // Fetch project statuses based on the provided parameters
  const fetchStatuses = async ({
    projectId,
    limit,
    page,
  }: GetProjectStatusesRequest) => {
    try {
      // Call the projectServices API to get project Statuses
      const response = await projectServices.getProjectStatuses({
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
            statuses: response.data.data,
          };
        });
      }
    } catch (error) {
      // Handle errors by throwing them
      throw error;
    }
  };

  // Remove a project status based on the provided properties
  const removeStatus = async (props: RemoveStatusRequest) => {
    try {
      // Call the projectServices API to remove a project Status
      const response = await projectServices.deleteStatus(props);

      // Destructure response data for ease of use
      const {
        data: { message, success },
      } = response;

      // If the removal is successful, set table loading and show a success notification
      if (success) {
        setTableLoading((prevLoading) => !prevLoading);
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

  // useEffect to fetch statuses when project, limit, or page is updated
  useEffect(() => {
    if (project?.id) {
      Promise.resolve([
        fetchStatuses({
          projectId: project.id,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [project, tableConfig.limit, tableConfig.page]);

  // useEffect to handle table loading state and refetch statuses
  useEffect(() => {
    if (tableLoading && project?.id) {
      setTableLoading(undefined);
      Promise.resolve([
        fetchStatuses({
          projectId: project.id,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [tableLoading]);

  return {
    tableConfig,
    setTableLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    setModal,
    handleCreateStatus,
    handleUpdateStatus,
    handleRemoveStatus,
  };
};
