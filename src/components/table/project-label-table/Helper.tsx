/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  ApiRequestWithPaginationAndSearch,
  GetProjectLabelsRequest,
  RemoveLabelRequest,
} from "../../../services/project-services/Helper";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../common/alert/Helper";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import {
  LabelAutocompleteOptionType,
  LabelAutocompleteResponse,
} from "../../../services/data-services/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import { enqueueSnackbar } from "notistack";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";
import ManageLabelForm from "../../form/manage-label/ManageLabelForm";
import { useRefreshContext } from "../../../utils/helpers/context/refresh-context/RefreshContext";

// Defining the interface for table data
interface TableData extends ApiRequestWithPaginationAndSearch {
  totalRows: number;
  labels: LabelAutocompleteResponse["data"] | [];
}
export const useManageProjectLabels = () => {
  // Destructuring and initializing state and context hooks
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const { setModal } = useModalContext();
  const { project } = useProjectContext();
  const { refresh } = useRefreshContext();

  const [initialRender, setInitialRender] = useState<boolean>();
  const [tableLoading, setTableLoading] = useState<boolean | undefined>(
    undefined,
  );

  const [tableConfig, setTableConfig] = useState<TableData>({
    page: 1,
    limit: 5,
    totalRows: 0,
    labels: [],
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

  // Function to handle Label removal
  const handleRemoveLabel = async ({ labelId }: { labelId: number }) => {
    // Showing an alert to confirm Label removal
    setAlert({
      open: true,
      alert: {
        title: "Remove Label",
        message: "Are you sure? Do you want to remove Label from this project?",
        positiveButton: "Confirm",
        negativeButton: "Cancel",
        response: async (click: string) => {
          handleCloseAlert();
          if (click === "accept" && project?.id) {
            // Removing the Label from the project
            await removeLabel({
              projectId: project.id,
              labelId,
            });
          }
        },
      },
    });
  };

  // Function to handle label updates
  const handleUpdateLabel = async ({
    row,
  }: {
    row: LabelAutocompleteOptionType;
  }) => {
    setModal({
      open: true,
      form: {
        body: (
          <ManageLabelForm values={row} setTableLoading={setTableLoading} />
        ),
        title: "Update Label",
      },
    });
  };

  // Function to handle label creation
  const handleCreateLabel = () =>
    setModal({
      open: true,
      form: {
        body: <ManageLabelForm setTableLoading={setTableLoading} />,
        title: "New Member",
      },
    });

  // Fetch project Labels based on the provided parameters
  const fetchLabels = async ({
    projectId,
    limit,
    page,
  }: GetProjectLabelsRequest) => {
    try {
      // Call the projectServices API to get project Labels
      const response = await projectServices.getProjectLabels({
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
            labels: response.data.data,
          };
        });
      }
    } catch (error) {
      // Handle errors by throwing them
      throw error;
    }
  };

  // Remove a project Label based on the provided properties
  const removeLabel = async (props: RemoveLabelRequest) => {
    try {
      // Call the projectServices API to remove a project Label
      const response = await projectServices.deleteLabel(props);

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

  // useEffect to fetch Labels when project, limit, or page is updated
  useEffect(() => {
    if (project?.id) {
      Promise.resolve([
        fetchLabels({
          projectId: project.id,
          limit: tableConfig.limit,
          page: tableConfig.page,
        }),
      ]);
    }
  }, [project, tableConfig.limit, tableConfig.page]);

  // useEffect to handle table loading state and refetch Labels
  useEffect(() => {
    if (tableLoading && project?.id) {
      setTableLoading(undefined);
      Promise.resolve([
        fetchLabels({
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
    setTableLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    setModal,
    handleCreateLabel,
    handleUpdateLabel,
    handleRemoveLabel,
  };
};
