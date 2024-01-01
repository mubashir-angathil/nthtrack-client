// Import necessary modules and types
import { AxiosError, AxiosResponse } from "axios";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import axios from "../api-instance/Instance";
import {
  AddNewMemberRequest,
  ApiRequestWithPaginationAndSearch,
  CreateStatusRequest,
  CreateStatusResponse,
  CreateLabelRequest,
  CreateLabelResponse,
  GetAllTasksRequest,
  GetProjectByIdResponse,
  GetProjectMembersRequest,
  GetProjectMembersResponse,
  GetTaskByIdResponse,
  ManageTaskRequest,
  ManageTaskResponse,
  MarkNotificationsAsReadRequest,
  ProjectsResponse,
  RemoveMemberRequest,
  TaskResponse,
  TeamProjectsRequest,
  UpdateMemberRequest,
  UpdateProjectRequest,
  UpdateTaskRequest,
  UpdateLabelRequest,
  UpdateStatusRequest,
  UpdatedTaskResponse,
  RemoveLabelRequest,
  GetProjectLabelsRequest,
  GetProjectLabelsResponse,
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
        "/project/create",
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
        "/project/update",
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
      name: searchKey,
    };

    // Remove projectName property from params if searchKey is empty or undefined
    searchKey === "" || (searchKey === undefined && delete params.name);

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
    labelId,
    searchKey,
  }: GetAllTasksRequest): Promise<AxiosResponse<TaskResponse>> => {
    const params = {
      labelId,
      searchKey,
    };

    labelId === undefined && delete params.labelId;
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
    ...props
  }: ManageTaskRequest): Promise<AxiosResponse<ManageTaskResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.post<ManageTaskResponse>(
        `/project/${projectId}/task/create`,
        {
          ...props,
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
   * UpdateProject
   *
   * UpdateProject project.
   *
   * @param {object} props - Object may containing either both projectName description or any one.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing project data.
   */
  updateTask: async (
    props: UpdateTaskRequest,
  ): Promise<AxiosResponse<UpdatedTaskResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.patch<UpdatedTaskResponse>(
        `/project/${props.projectId}/task/update`,
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
   * getTaskById
   *
   * Retrieves tasks by id .
   *
   * @param {number} taskId - taskId.
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing task data.
   */
  getTasksById: async ({
    taskId,
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }): Promise<AxiosResponse<GetTaskByIdResponse>> => {
    try {
      const response = await axios.get<GetTaskByIdResponse>(
        `/project/${projectId}/task/${taskId}`,
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
      return await axios.delete<NormalApiSuccessResponse>(
        `project/${projectId}/close`,
      );
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
    projectId,
  }: {
    taskId: number;
    projectId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `project/${projectId}/task/${taskId}/close`,
      );
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getTeamProjects: async ({
    page,
    limit,
    searchKey,
    teamId,
  }: TeamProjectsRequest): Promise<AxiosResponse<ProjectsResponse>> => {
    // Prepare request parameters
    const params = {
      page,
      limit,
      name: searchKey,
    };

    // Remove projectName property from params if searchKey is empty or undefined
    searchKey === "" || (searchKey === undefined && delete params.name);

    try {
      // Make the API request to get all projects
      const response = await axios.get<ProjectsResponse>(
        `/project/team/${teamId}`,
        {
          params,
        },
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  addNewMember: async ({
    projectId,
    ...props
  }: AddNewMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.post<NormalApiSuccessResponse>(
        `/project/${projectId}/member/add`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  updateMember: async ({
    projectId,
    ...props
  }: UpdateMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.put<NormalApiSuccessResponse>(
        `/project/${projectId}/member/update`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  removeMember: async ({
    projectId,
    memberId,
    userId,
  }: RemoveMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/member/${memberId}/delete`,
        {
          params: {
            userId,
          },
        },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getProjectMembers: async ({
    projectId,
    ...props
  }: GetProjectMembersRequest): Promise<
    AxiosResponse<GetProjectMembersResponse>
  > => {
    try {
      return await axios.post<GetProjectMembersResponse>(
        `/project/${projectId}/members`,
        { ...props },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  markNotificationsAsRead: async (
    props: MarkNotificationsAsReadRequest,
  ): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/notification/all/mark-as-read`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  deleteProject: async ({ projectId }: { projectId: number }) => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  restoreClosedProject: async ({ projectId }: { projectId: number }) => {
    try {
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/reopen`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  restoreClosedTask: async ({
    projectId,
    taskId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/task/${taskId}/reopen`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  deleteTask: async ({
    projectId,
    taskId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/task/${taskId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  createStatus: async ({
    projectId,
    ...props
  }: CreateStatusRequest): Promise<AxiosResponse<CreateStatusResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.post<CreateStatusResponse>(
        `/project/${projectId}/status/create`,
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  createLabel: async ({
    projectId,
    ...props
  }: CreateLabelRequest): Promise<AxiosResponse<CreateLabelResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.post<CreateLabelResponse>(
        `/project/${projectId}/label/create`,
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  deleteStatus: async ({
    projectId,
    statusId,
  }: {
    statusId: number;
    projectId: number;
  }) => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/status/${statusId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  deleteLabel: async ({ projectId, labelId }: RemoveLabelRequest) => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/label/${labelId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  updateStatus: async ({
    projectId,
    statusId,
    ...props
  }: UpdateStatusRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/status/${statusId}/update`,
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  updateLabel: async ({
    projectId,
    labelId,
    ...props
  }: UpdateLabelRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to get all projects
      const response = await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/label/${labelId}/update`,
        props,
      );

      // Return the response
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getProjectLabels: async ({
    projectId,
    ...props
  }: GetProjectLabelsRequest): Promise<
    AxiosResponse<GetProjectLabelsResponse>
  > => {
    try {
      return await axios.post<GetProjectLabelsResponse>(
        `/project/${projectId}/labels`,
        { ...props },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

// Export the projectServices object
export default projectServices;
