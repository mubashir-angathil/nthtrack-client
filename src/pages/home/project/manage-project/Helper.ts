import { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import projectServices from "../../../../services/project-services/ProjectServices";
import { ApiError } from "../../../../services/Helper";
import { GetProjectByIdResponse } from "../../../../services/project-services/Helper";
import { enqueueSnackbar } from "notistack";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";

export interface ManageProjectProps {
  type: "create" | "update";
}

export const useUpdateProject = ({ type }: ManageProjectProps) => {
  const params: Params = useParams();
  const [projectId] = useState<number>(
    params?.projectId ? parseInt(params.projectId) : 0,
  );
  // State variables for project and tasks, as well as API configuration
  const [project, setProject] = useState<GetProjectByIdResponse["data"]>();

  // Function to fetch project details from the API
  const fetchProjectById = async () => {
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
      enqueueSnackbar({ message: data.message, variant: "error" });
    }
  };

  useEffect(() => {
    if (projectId === 0 && type === "update") return generalFunctions.goBack();
    else if (type === "update") fetchProjectById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { project };
};
