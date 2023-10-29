// Import necessary modules and types
import { AxiosError, AxiosResponse } from "axios";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import axios from "../api-instance/Instance";
import {
  ApiRequestWithPaginationAndSearch,
  GetAllTasksRequest,
  GetProjectByIdResponse,
  GetTaskByIdResponse,
  ManageTaskRequest,
  ProjectsResponse,
  TaskResponse,
  UpdateProjectRequest,
} from "./Helper";
import { ApiError, NormalApiSuccessResponse } from "../Helper";
import { ManageProjectFormInput } from "../../components/form/manage-project/Helper";

// Service functions related to projects
const projectServices = {
  /**
   * CreateProject
   *
   * CreateProject project.
   *
   * @param {object} props - Object containing projectName, description.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing project data.
   */
  createProject: async (
    props: ManageProjectFormInput,
  ): Promise<AxiosResponse<ProjectsResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.post<ProjectsResponse>(
        "/project/create-project",
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  /**
   * UpdateProject
   *
   * UpdateProject project.
   *
   * @param {object} props - Object may containing either both projectName description or any one.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing project data.
   */
  updateProject: async (
    props: UpdateProjectRequest,
  ): Promise<AxiosResponse<ProjectsResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.patch<ProjectsResponse>(
        "/project/update-project",
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
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
      throw generalFunctions.customError(error as AxiosError<ApiError>);
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
      const response = await axios.get<TaskResponse>(
        `/project/${projectId}/task/all`,
        {
          params,
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
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
      const response = await axios.get<GetProjectByIdResponse>(
        `/project/${projectId}`,
        {
          params: { projectId },
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  /**
   * CreateTask
   *
   * Create Task.
   *
   * @param {object} props - Object containing trackerID, description.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing task data.
   */
  createTask: async ({
    projectId,
    trackerId,
    description,
  }: ManageTaskRequest): Promise<AxiosResponse<TaskResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.post<TaskResponse>(
        `/project/${projectId}/task/create`,
        {
          trackerId,
          description,
        },
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  /**
   * getTaskById
   *
   * Retrieves tasks by id .
   *
   * @param {number} taskId - taskId.
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing task data.
   */
  getTasksById: async ({
    taskId,
  }: {
    taskId: number;
  }): Promise<AxiosResponse<GetTaskByIdResponse>> => {
    try {
      const response = await axios.get<GetTaskByIdResponse>(
        `/project/task/${taskId}`,
        {
          params: { taskId },
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  /**
   * closeProjectById
   *
   * Close project by id .
   *
   * @param {number} projectId - projectId.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response containing closed status.
   */
  closeProjectById: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      const response = await axios.patch<NormalApiSuccessResponse>(
        "project/close",
        {
          projectId,
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  /**
   * closeTaskById
   *
   * Close task by id .
   *
   * @param {number} taskId - taskId.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response containing closed status.
   */
  closeTaskById: async ({
    taskId,
  }: {
    taskId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      const response = await axios.patch<NormalApiSuccessResponse>(
        "project/task/close",
        {
          taskId,
        },
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

// Export the projectServices object
export default projectServices;
