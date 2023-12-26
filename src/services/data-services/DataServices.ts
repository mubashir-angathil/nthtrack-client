import { AxiosError, AxiosResponse } from "axios";
import axios from "../api-instance/Instance";
import {
  AutocompleteOptionType,
  GetEnrolledProjectIdsResponse,
  GetNotificationRequest,
  GetNotificationResponse,
  GetProjectMemberRequest,
  GetProjectMemberResponse,
  LabelAutocompleteResponse,
  SelectFieldApiResponse,
  StatusAutocompleteResponse,
  Teams,
} from "./Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import { ApiError } from "../Helper";
import { ApiRequestWithPaginationAndSearch } from "../project-services/Helper";
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
  getTeams: async (): Promise<AxiosResponse<Teams>> => {
    try {
      const response = await axios.get<Teams>("data/teams");
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getPermissions: async (): Promise<AxiosResponse<SelectFieldApiResponse>> => {
    try {
      return await axios.get<SelectFieldApiResponse>("data/permissions");
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getUsers: async ({
    limit,
    page,
    searchKey,
    cancelToken,
  }: ApiRequestWithPaginationAndSearch): Promise<
    AxiosResponse<AutocompleteOptionType>
  > => {
    try {
      return await axios.post<AutocompleteOptionType>(
        "data/users",
        {
          limit,
          page,
          searchKey,
        },
        {
          cancelToken,
        },
      );
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getProjectMembers: async ({
    projectId,
  }: GetProjectMemberRequest): Promise<
    AxiosResponse<GetProjectMemberResponse>
  > => {
    try {
      return await axios.get<GetProjectMemberResponse>(
        `data/project/${projectId}/members`,
      );
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getNotifications: async ({
    roomIds,
    page,
    limit,
  }: GetNotificationRequest): Promise<
    AxiosResponse<GetNotificationResponse>
  > => {
    try {
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
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getEnrolledProjectIds: async (): Promise<
    AxiosResponse<GetEnrolledProjectIdsResponse>
  > => {
    try {
      return await axios.get<GetEnrolledProjectIdsResponse>(
        "data/team/project/all",
      );
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

export default dataServices;
