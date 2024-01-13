import { AxiosError, AxiosResponse } from "axios";
import axios from "../api-instance/Instance";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import { ApiError, NormalApiSuccessResponse } from "../Helper";
import {
  GetNotificationRequest,
  GetNotificationResponse,
  MarkNotificationsAsReadRequest,
  UerProfileResponse,
  UpdateProfileDetails,
} from "./Helper";

const services = {
  getProfileDetails: async ({
    userId,
  }: {
    userId: number;
  }): Promise<AxiosResponse<UerProfileResponse>> => {
    try {
      return await axios.get<UerProfileResponse>(`/user/${userId}/profile`);
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  updateProfileDetails: async ({
    userId,
    ...props
  }: UpdateProfileDetails): Promise<
    AxiosResponse<NormalApiSuccessResponse>
  > => {
    try {
      return await axios.patch<NormalApiSuccessResponse>(
        `/user/${userId}/profile/update`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  deleteAccount: async ({
    userId,
  }: {
    userId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.delete<NormalApiSuccessResponse>(
        `/account/${userId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  getNotifications: async (
    { page, limit, type }: GetNotificationRequest,
    newNotificationsOnly?: boolean,
  ): Promise<AxiosResponse<GetNotificationResponse>> => {
    try {
      return await axios.get<GetNotificationResponse>("/user/notifications", {
        params: {
          page,
          limit,
          type,
          unread: newNotificationsOnly,
        },
      });
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
  markNotificationsAsRead: async (
    props: MarkNotificationsAsReadRequest,
  ): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      return await axios.patch<NormalApiSuccessResponse>(
        `/user/notifications/read`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};
export default services;
