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
  GetProjectStatusesRequest,
  GetProjectStatusesResponse,
  RemoveStatusRequest,
  GetPermissionResponse,
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
   * getTeamProjects
   *
   * Fetches team projects based on specified parameters.
   *
   * @param {TeamProjectsRequest} request - Request object containing parameters for the API call.
   * @param {number} request.page - Page number for pagination.
   * @param {number} request.limit - Number of items per page.
   * @param {string} request.searchKey - Search key for filtering projects by name.
   * @param {number} request.teamId - ID of the team for which projects are to be retrieved.
   * @returns {Promise<AxiosResponse<ProjectsResponse>>} Promise that resolves to the response containing team projects.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
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

  /**
   * addNewMember
   *
   * Adds a new member to the specified project.
   *
   * @param {AddNewMemberRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project to which the new member is added.
   * @param {...any} request.props - Additional properties for adding a new member.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  addNewMember: async ({
    projectId,
    ...props
  }: AddNewMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to add a new member to the project
      return await axios.post<NormalApiSuccessResponse>(
        `/project/${projectId}/member/add`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * updateMember
   *
   * Updates a member in the specified project.
   *
   * @param {UpdateMemberRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project to which the member belongs.
   * @param {...any} request.props - Additional properties for updating the member.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  updateMember: async ({
    projectId,
    ...props
  }: UpdateMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to update the member in the project
      return await axios.put<NormalApiSuccessResponse>(
        `/project/${projectId}/member/update`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * removeMember
   *
   * Removes a member from the specified project.
   *
   * @param {RemoveMemberRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project from which the member is removed.
   * @param {number} request.memberId - ID of the member to be removed.
   * @param {number} request.userId - ID of the user initiating the removal.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  removeMember: async ({
    projectId,
    memberId,
    userId,
  }: RemoveMemberRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to remove the member from the project
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

  /**
   * getProjectMembers
   *
   * Fetches members of the specified project based on provided parameters.
   *
   * @param {GetProjectMembersRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which members are to be fetched.
   * @param {...any} request.props - Additional properties for the API call.
   * @returns {Promise<AxiosResponse<GetProjectMembersResponse>>} Promise that resolves to the response containing project members.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProjectMembers: async ({
    projectId,
    ...props
  }: GetProjectMembersRequest): Promise<
    AxiosResponse<GetProjectMembersResponse>
  > => {
    try {
      // Make the API request to get members of the project
      return await axios.post<GetProjectMembersResponse>(
        `/project/${projectId}/members`,
        { ...props },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * deleteProject
   *
   * Deletes the specified project.
   *
   * @param {number} projectId - ID of the project to be deleted.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  deleteProject: async ({ projectId }: { projectId: number }) => {
    try {
      // Make the API request to delete the project
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * restoreClosedProject
   *
   * Restores the specified closed project.
   *
   * @param {number} projectId - ID of the closed project to be restored.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  restoreClosedProject: async ({ projectId }: { projectId: number }) => {
    try {
      // Make the API request to restore the closed project
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/reopen`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * deleteTask
   *
   * Deletes the specified task from the project.
   *
   * @param {object} params - Object containing parameters for the API call.
   * @param {number} params.taskId - ID of the task to be deleted.
   * @param {number} params.projectId - ID of the project from which the task is deleted.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  deleteTask: async ({
    projectId,
    taskId,
  }: {
    taskId: number;
    projectId: number;
  }) => {
    try {
      // Make the API request to delete the task from the project
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/task/${taskId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * createStatus
   *
   * Creates a new status for the specified project.
   *
   * @param {CreateStatusRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the status is created.
   * @param {...any} request.props - Additional properties for creating the status.
   * @returns {Promise<AxiosResponse<CreateStatusResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  createStatus: async ({
    projectId,
    ...props
  }: CreateStatusRequest): Promise<AxiosResponse<CreateStatusResponse>> => {
    try {
      // Make the API request to create a new status for the project
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

  /**
   * createLabel
   *
   * Creates a new label for the specified project.
   *
   * @param {CreateLabelRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the label is created.
   * @param {...any} request.props - Additional properties for creating the label.
   * @returns {Promise<AxiosResponse<CreateLabelResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  createLabel: async ({
    projectId,
    ...props
  }: CreateLabelRequest): Promise<AxiosResponse<CreateLabelResponse>> => {
    try {
      // Make the API request to create a new label for the project
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

  /**
   * deleteStatus
   *
   * Deletes the specified status from the project.
   *
   * @param {RemoveStatusRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project from which the status is deleted.
   * @param {number} request.statusId - ID of the status to be deleted.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  deleteStatus: async ({ projectId, statusId }: RemoveStatusRequest) => {
    try {
      // Make the API request to delete the status from the project
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/status/${statusId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * deleteLabel
   *
   * Deletes the specified label from the project.
   *
   * @param {RemoveLabelRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project from which the label is deleted.
   * @param {number} request.labelId - ID of the label to be deleted.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  deleteLabel: async ({ projectId, labelId }: RemoveLabelRequest) => {
    try {
      // Make the API request to delete the label from the project
      return await axios.delete<NormalApiSuccessResponse>(
        `/project/${projectId}/label/${labelId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * updateStatus
   *
   * Updates the specified status for the project.
   *
   * @param {UpdateStatusRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the status is updated.
   * @param {number} request.statusId - ID of the status to be updated.
   * @param {...any} request.props - Additional properties for updating the status.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  updateStatus: async ({
    projectId,
    statusId,
    ...props
  }: UpdateStatusRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to update the status for the project
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

  /**
   * updateLabel
   *
   * Updates the specified label for the project.
   *
   * @param {UpdateLabelRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the label is updated.
   * @param {number} request.labelId - ID of the label to be updated.
   * @param {...any} request.props - Additional properties for updating the label.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  updateLabel: async ({
    projectId,
    labelId,
    ...props
  }: UpdateLabelRequest): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to update the label for the project
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

  /**
   * getProjectLabels
   *
   * Retrieves labels for the specified project.
   *
   * @param {GetProjectLabelsRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which labels are retrieved.
   * @param {...any} request.props - Additional properties for retrieving project labels.
   * @returns {Promise<AxiosResponse<GetProjectLabelsResponse>>} Promise that resolves to the response containing project labels.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProjectLabels: async ({
    projectId,
    ...props
  }: GetProjectLabelsRequest): Promise<
    AxiosResponse<GetProjectLabelsResponse>
  > => {
    try {
      // Make the API request to get labels for the project
      return await axios.post<GetProjectLabelsResponse>(
        `/project/${projectId}/labels`,
        { ...props },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getProjectStatuses
   *
   * Retrieves statuses for the specified project.
   *
   * @param {GetProjectStatusesRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which statuses are retrieved.
   * @param {...any} request.props - Additional properties for retrieving project statuses.
   * @returns {Promise<AxiosResponse<GetProjectStatusesResponse>>} Promise that resolves to the response containing project statuses.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProjectStatuses: async ({
    projectId,
    ...props
  }: GetProjectStatusesRequest): Promise<
    AxiosResponse<GetProjectStatusesResponse>
  > => {
    try {
      // Make the API request to get statuses for the project
      return await axios.post<GetProjectStatusesResponse>(
        `/project/${projectId}/statuses`,
        { ...props },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * acceptInvitation
   *
   * Accepts an invitation to join the specified project.
   *
   * @param {AcceptInvitationRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the invitation is accepted.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  acceptInvitation: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to accept the project invitation
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/invitation/accept`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * rejectInvitation
   *
   * Rejects an invitation to join the specified project.
   *
   * @param {RejectInvitationRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the invitation is rejected.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  rejectInvitation: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to reject the project invitation
      return await axios.patch<NormalApiSuccessResponse>(
        `/project/${projectId}/invitation/reject`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getProjectPermission
   *
   * Retrieves the project permission for the authenticated user.
   *
   * @param {GetProjectPermissionRequest} request - Request object containing parameters for the API call.
   * @param {number} request.projectId - ID of the project for which the user's permission is retrieved.
   * @returns {Promise<AxiosResponse<GetPermissionResponse>>} Promise that resolves to the response containing the user's project permission.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProjectPermission: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<GetPermissionResponse>> => {
    try {
      // Make the API request to get the user's project permission
      return await axios.get<GetPermissionResponse>(
        `/project/${projectId}/permission/user`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

// Export the projectServices object
export default projectServices;
