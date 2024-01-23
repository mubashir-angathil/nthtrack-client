import React from "react";
import { Project } from "../../../../services/project-services/Helper";
import projectServices from "../../../../services/project-services/ProjectServices";
import { useProjectContext } from "./ProjectContext";
import { ApiError } from "../../../../services/Helper";

// Define the ProjectContextProps interface
export interface ProjectContextProps {
  // The current project or null if none is set
  project: Project | null;

  // Function to update the current project
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

export const useProjectContextHelpers = () => {
  const { setProject } = useProjectContext();

  // Function to fetch project details from the API
  const fetchProjectById = async ({ projectId }: { projectId: number }) => {
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
      console.error(data);
    }
  };
  return { fetchProjectById };
};
