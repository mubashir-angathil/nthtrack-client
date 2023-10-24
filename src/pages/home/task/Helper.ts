/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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

export const useTask = () => {
  const params: Params = useParams();
  const navigate: NavigateFunction = useNavigate();
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
      const task = await projectServices.closeTaskById({
        taskId,
      });

      if (task.status === 200 && task.data.success) {
        alert(task.data.message);
      } else {
        throw generalFunctions.customError(task as any);
      }
    } catch (error) {
      const { data } = error as ApiError;
      if (!data.success) {
        alert(data.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProjectById();
    }, 500);

    if (taskId === 0) {
      navigate(routes.home.path);
    }
  }, []);
  return { task, fetchCloseTaskById };
};
