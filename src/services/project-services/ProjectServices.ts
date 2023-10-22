// Import necessary modules and types
import { AxiosError, AxiosResponse } from "axios";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import axios from "../api-instance/ProjectInstance";
import {
  ApiRequestWithPaginationAndSearch,
  GetAllTasksRequest,
  GetProjectByIdResponse,
  ProjectsResponse,
  TaskResponse,
} from "./Helper";

// Service functions related to projects
const projectServices = {
  /**
   * getAllProjects
   *
   * Retrieves all projects with pagination and search functionality.
   *
   * @param {object} apiConfig - Object containing page, limit, and searchKey for pagination and search.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing project data.
   */
  getAllProjects: async ({
    page,
    limit,
    searchKey,
  }: ApiRequestWithPaginationAndSearch): Promise<
    AxiosResponse<ProjectsResponse>
  > => {
    // Prepare request parameters
    const params = {
      page,
      limit,
      projectName: searchKey,
    };

    // Remove projectName property from params if searchKey is empty or undefined
    searchKey === "" || (searchKey === undefined && delete params.projectName);

    try {
      // Make the API request to get all projects
      const response = await axios.get<ProjectsResponse>("/project/all", {
        params,
      });

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError);
    }
  },
  /**
   * getAllTasks
   *
   * Retrieves all tasks with pagination and search functionality.
   *
   * @param {object} apiConfig - Object containing page, limit, and searchKey for pagination and search.
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing project data.
   */
  getAllTasks: async ({
    projectId,
    trackerId,
    statusId,
    searchKey,
    limit,
    page,
  }: GetAllTasksRequest): Promise<AxiosResponse<TaskResponse>> => {
    const params = {
      page,
      limit,
      trackerId,
      statusId,
      searchKey,
    };

    statusId === undefined && delete params.statusId;
    trackerId === undefined && delete params.trackerId;
    searchKey === undefined && delete params.searchKey;

    try {
      const response = axios.get<TaskResponse>(
        `/project/${projectId}/task/all`,
        {
          params,
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError);
    }
  },
  /**
   * getProjectById
   *
   * Retrieves project by id .
   *
   * @param {number} projectId - projectId.
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing project data.
   */
  getProjectById: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<GetProjectByIdResponse>> => {
    try {
      const response = axios.get<GetProjectByIdResponse>(
        `/project/${projectId}`,
        {
          params: { projectId },
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError);
    }
  },
};

// Export the projectServices object
export default projectServices;
