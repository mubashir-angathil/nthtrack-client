import { AxiosError, AxiosResponse } from "axios";
import axios from "../api-instance/Instance";
import {
  AutocompleteOptionType,
  GetEnrolledProjectIdsResponse,
  GetNotificationRequest,
  GetNotificationResponse,
  GetProjectMemberRequest,
  GetProjectMemberResponse,
  GetUsersRequest,
  LabelAutocompleteResponse,
  SelectFieldApiResponse,
  StatusAutocompleteResponse,
  Teams,
} from "./Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import { ApiError } from "../Helper";
const dataServices = {
  /**
   * getAllTrackers
   *
   * Retrieves all trackers.
   *
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing tracker data.
   */
  getLabels: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<LabelAutocompleteResponse>> => {
    try {
      return await axios.post<LabelAutocompleteResponse>(
        `data/project/${projectId}/labels`,
      );
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getAllStatus
   *
   * Retrieves all statues.
   *
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing status data.
   */
  getStatuses: async ({
    projectId,
  }: {
    projectId: number;
  }): Promise<AxiosResponse<StatusAutocompleteResponse>> => {
    try {
      const response = await axios.get<StatusAutocompleteResponse>(
        `data/project/${projectId}/statuses`,
      );
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getTeams
   *
   * Retrieves a list of teams.
   *
   * @returns {Promise<AxiosResponse<Teams>>} Promise that resolves to the response containing the list of teams.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getTeams: async (): Promise<AxiosResponse<Teams>> => {
    try {
      // Make the API request to get the list of teams
      const response = await axios.get<Teams>("data/teams");
      return response;
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getPermissions
   *
   * Retrieves a list of permissions.
   *
   * @returns {Promise<AxiosResponse<SelectFieldApiResponse>>} Promise that resolves to the response containing the list of permissions.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getPermissions: async (): Promise<AxiosResponse<SelectFieldApiResponse>> => {
    try {
      // Make the API request to get the list of permissions
      return await axios.get<SelectFieldApiResponse>("data/permissions");
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getUsers
   *
   * Retrieves a list of users with optional pagination and search parameters.
   *
   * @param {ApiRequestWithPaginationAndSearch} request - Request object containing parameters for the API call.
   * @param {number} request.limit - Limit for the number of users per page.
   * @param {number} request.page - Page number for pagination.
   * @param {string} request.searchKey - Search key for filtering users.
   * @param {CancelToken} request.cancelToken - Token that can be used to cancel the request.
   * @returns {Promise<AxiosResponse<AutocompleteOptionType>>} Promise that resolves to the response containing the list of users.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getUsers: async ({
    limit,
    page,
    searchKey,
    cancelToken,
    projectId,
  }: GetUsersRequest): Promise<AxiosResponse<AutocompleteOptionType>> => {
    try {
      // Make the API request to get the list of users
      return await axios.post<AutocompleteOptionType>(
        "data/users",
        {
          limit,
          page,
          searchKey,
          projectId,
        },
        {
          cancelToken,
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
   * Retrieves the members of a project based on the provided projectId.
   *
   * @param {GetProjectMemberRequest} request - Request object containing the projectId for the API call.
   * @param {number} request.projectId - ID of the project for which to retrieve members.
   * @returns {Promise<AxiosResponse<GetProjectMemberResponse>>} Promise that resolves to the response containing the members of the project.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProjectMembers: async ({
    projectId,
  }: GetProjectMemberRequest): Promise<
    AxiosResponse<GetProjectMemberResponse>
  > => {
    try {
      // Make the API request to get the members of the project
      return await axios.get<GetProjectMemberResponse>(
        `data/project/${projectId}/members`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getNotifications
   *
   * Retrieves notifications based on the provided roomIds, page, and limit.
   *
   * @param {GetNotificationRequest} request - Request object containing parameters for the API call.
   * @param {number[]} request.roomIds - Array of roomIds to filter notifications.
   * @param {number} request.page - Page number for pagination.
   * @param {number} request.limit - Limit for the number of notifications per page.
   * @returns {Promise<AxiosResponse<GetNotificationResponse>>} Promise that resolves to the response containing notifications.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getNotifications: async ({
    roomIds,
    page,
    limit,
  }: GetNotificationRequest): Promise<
    AxiosResponse<GetNotificationResponse>
  > => {
    try {
      // Make the API request to get notifications
      return await axios.get<GetNotificationResponse>(
        `data/user/notifications`,
        {
          params: {
            roomIds: roomIds.toString(),
            page,
            limit,
          },
        },
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getEnrolledProjectIds
   *
   * Retrieves the IDs of projects in which the user is enrolled.
   *
   * @returns {Promise<AxiosResponse<GetEnrolledProjectIdsResponse>>} Promise that resolves to the response containing enrolled project IDs.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getEnrolledProjectIds: async (): Promise<
    AxiosResponse<GetEnrolledProjectIdsResponse>
  > => {
    try {
      // Make the API request to get enrolled project IDs
      return await axios.get<GetEnrolledProjectIdsResponse>(
        "data/team/project/all",
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

export default dataServices;
