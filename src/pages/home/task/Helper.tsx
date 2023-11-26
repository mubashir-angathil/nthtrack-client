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
import { enqueueSnackbar } from "notistack";
import { useAlertContext } from "../../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../../components/common/alert/Helper";

export const useTask = () => {
  const params: Params = useParams();
  const navigate: NavigateFunction = useNavigate();
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();

  const [ids] = useState<{ taskId: number; projectId: number }>({
    taskId: params.taskId ? parseInt(params.taskId) : 0,
    projectId: params.projectId ? parseInt(params.projectId) : 0,
  });

  const [task, setTask] = useState<GetTaskByIdResponse["data"] | undefined>();

  const handleTaskUpdate = () => {
    if (routes.tasks.update?.path) {
      navigate(routes.tasks.update.path);
    }
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
          if (res === "accept" && task?.id) {
            handleCloseAlert();
            await fetchCloseTaskById({
              projectId: ids.projectId,
              taskId: task.id,
            });
          }
        },
      },
    });
  };

  // Function to fetch project details from the API
  const fetchTaskById = async ({
    taskId,
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getTasksById({
        taskId,
        projectId,
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

      enqueueSnackbar({
        message: data?.message,
        variant: "error",
      });
    }
  };

  // Function to close the task by id  the API
  const fetchCloseTaskById = async ({
    taskId,
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      const project = await projectServices.closeTaskById({
        projectId,
        taskId,
      });

      if (project.status === 200 && project.data.success) {
        enqueueSnackbar({
          message: project.data.message,
          variant: "success",
        });
        generalFunctions.goBack();
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
    if (ids.taskId === 0 || ids.projectId === 0) {
      generalFunctions.goBack();
    }
    fetchTaskById({ projectId: ids.projectId, taskId: ids.taskId });
  }, []);
  return { task, handleCloseTask, handleTaskUpdate };
};
