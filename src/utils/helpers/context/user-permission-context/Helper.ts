import React from "react";
import { GetPermissionResponse } from "../../../../services/project-services/Helper";
import projectServices from "../../../../services/project-services/ProjectServices";
import { ApiError } from "../../../../services/Helper";
import { useUserPermissionContext } from "./UserPermissionContext";

// Define the UserPermissionProps interface
export interface UserPermissionProps {
  // The current project or null if none is set
  permission: GetPermissionResponse["data"] | null;

  // Function to update the current project
  setPermission: React.Dispatch<
    React.SetStateAction<GetPermissionResponse["data"] | null>
  >;
}

export const useUserPermissionHelpers = () => {
  const { setPermission } = useUserPermissionContext();

  // Function to fetch project details from the API
  const fetchUserProjectPermission = async ({
    projectId,
  }: {
    projectId: number;
  }) => {
    try {
      // Call the API to get project details based on the current API configuration
      const response = await projectServices.getProjectPermission({
        projectId,
      });

      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update project details
      if (status === 200 && success) {
        setPermission(data);
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
  return { fetchUserProjectPermission };
};
