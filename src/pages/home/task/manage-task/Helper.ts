import { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import projectServices from "../../../../services/project-services/ProjectServices";
import { ApiError } from "../../../../services/Helper";
import { GetTaskByIdResponse } from "../../../../services/project-services/Helper";
import { enqueueSnackbar } from "notistack";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";

export interface ManageTaskProps {
  type: "create" | "update";
}

export const useUpdateTask = ({ type }: ManageTaskProps) => {
  const params: Params = useParams();
  const [ids] = useState<{ taskId: number; projectId: number }>({
    taskId: params.taskId ? parseInt(params.taskId) : 0,
    projectId: params.projectId ? parseInt(params.projectId) : 0,
  });

  const [task, setTask] = useState<GetTaskByIdResponse["data"]>();
  // Function to fetch project details from the API
  const fetchTaskById = async () => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getTasksById({
        taskId: ids.taskId,
        projectId: ids.projectId,
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

  useEffect(() => {
    if ((ids.taskId === 0 || ids.projectId === 0) && type === "update")
      return generalFunctions.goBack();
    else if (type === "update") fetchTaskById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.taskId]);

  return { task };
};
