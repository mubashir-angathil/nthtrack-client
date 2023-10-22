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

  useEffect(() => {
    setTimeout(() => {
      fetchProjectById();
    }, 500);

    if (taskId === 0) {
      navigate(routes.home.path);
    }
  }, []);
  return { task };
};
