/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect } from "react";
import projectServices from "../../../services/project-services/ProjectServices";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ApiError } from "../../../services/Helper";
import { GetTaskByIdResponse } from "../../../services/project-services/Helper";
import routes from "../../../utils/helpers/routes/Routes";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { useDialogContext } from "../../../utils/helpers/context/dialog-context/DialogContext";
import ManageTaskForm from "../../../components/form/manage-task/ManageTaskForm";
import { enqueueSnackbar } from "notistack";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../../components/common/alert/Helper";

export const useTask = () => {
  const params: Params = useParams();
  const navigate: NavigateFunction = useNavigate();
  const { setDialog } = useDialogContext();
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();

  const [taskId] = useState<number>(params.id ? parseInt(params.id) : 0);
  const [task, setTask] = useState<GetTaskByIdResponse["data"]>({
    id: 0,
    description: "",
    tracker: { id: 0, name: "" },
    status: { id: 0, name: "" },
    createdAt: "",
    updatedAt: "",
    closedAt: null,
  });

  const handleTaskUpdate = () => {
    setDialog({
      open: true,
      form: {
        title: "Update Task",
        body: <ManageTaskForm values={task} />,
      },
    });
  };

  const handleCloseTask = () => {
    setAlert({
      open: true,
      alert: {
        title: "Close Task",
        message: "Are you sure?",
        positiveButton: "Accept",
        negativeButton: "Cancel",
        response: async (res) => {
          if (res === "accept") {
            handleCloseAlert();
            await fetchCloseTaskById();
          }
        },
      },
    });
  };

  // Function to fetch project details from the API
  const fetchProjectById = async () => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getTasksById({
        taskId,
      });

      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update project details
      if (status === 200 && success) {
        setTask(data);
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

  // Function to close the task by id  the API
  const fetchCloseTaskById = async () => {
    try {
      const project = await projectServices.closeTaskById({
        taskId: task.id,
      });

      if (project.status === 200 && project.data.success) {
        enqueueSnackbar({
          message: project.data.message,
          variant: "success",
        });
        navigate(routes.home.path);
      } else {
        throw generalFunctions.customError(project as any);
      }
    } catch (error) {
      const { data } = error as ApiError;
      if (data.success === false) {
        enqueueSnackbar({
          message: data.message,
          variant: "error",
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (taskId === 0) {
      navigate(routes.home.path);
    }
    fetchProjectById();
  }, []);
  return { task, handleCloseTask, handleTaskUpdate };
};
