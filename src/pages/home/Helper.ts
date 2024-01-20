import { useLayoutEffect, useState } from "react";
import { ApiRequestWithPaginationAndSearch } from "../../services/project-services/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../services/Helper";
import dataServices from "../../services/data-services/DataServices";
import { Teams } from "../../services/data-services/Helper";

// Define the shape of the API configuration
export interface ApiConfig extends ApiRequestWithPaginationAndSearch {
  hasMore: boolean;
}

export const paginationAndSearchConfiguration: ApiConfig = {
  page: 1,
  limit: 4,
  hasMore: true,
  searchKey: undefined,
};

export const useHome = () => {
  const [teams, setTeams] = useState<Teams["data"]>([]);

  // Function to fetch teams from the API
  const fetchTeams = async () => {
    try {
      // Call the API to get projects based on the current API configuration
      const response = await dataServices.getTeams();
      const {
        status,
        data: { data, message, success },
      } = response;

      // If the API call is successful, update projects and API configuration
      if (status === 200 && success) {
        setTeams(data);
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
  useLayoutEffect(() => {
    sessionStorage.removeItem("project");
    fetchTeams();
  }, []);

  return { teams };
};
