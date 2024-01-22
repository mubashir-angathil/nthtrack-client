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
  /**
   * getProfileDetails
   *
   * Retrieves the profile details of a user based on the provided userId.
   *
   * @param {number} userId - ID of the user for which to retrieve profile details.
   * @returns {Promise<AxiosResponse<UerProfileResponse>>} Promise that resolves to the response containing user profile details.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getProfileDetails: async ({
    userId,
  }: {
    userId: number;
  }): Promise<AxiosResponse<UerProfileResponse>> => {
    try {
      // Make the API request to get user profile details
      return await axios.get<UerProfileResponse>(`/user/${userId}/profile`);
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * updateProfileDetails
   *
   * Updates the profile details of a user based on the provided userId and props.
   *
   * @param {UpdateProfileDetails} request - Request object containing parameters for the API call.
   * @param {number} request.userId - ID of the user for which to update profile details.
   * @param {Object} request.props - Properties to update in the user profile.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  updateProfileDetails: async ({
    userId,
    ...props
  }: UpdateProfileDetails): Promise<
    AxiosResponse<NormalApiSuccessResponse>
  > => {
    try {
      // Make the API request to update user profile details
      return await axios.patch<NormalApiSuccessResponse>(
        `/user/${userId}/profile/update`,
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * deleteAccount
   *
   * Deletes the account of a user based on the provided userId.
   *
   * @param {number} userId - ID of the user for which to delete the account.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  deleteAccount: async ({
    userId,
  }: {
    userId: number;
  }): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to delete user account
      return await axios.delete<NormalApiSuccessResponse>(
        `/account/${userId}/delete`,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * getNotifications
   *
   * Retrieves notifications based on the provided page, limit, type, and newNotificationsOnly flag.
   *
   * @param {GetNotificationRequest} request - Request object containing parameters for the API call.
   * @param {number} request.page - Page number for pagination.
   * @param {number} request.limit - Limit for the number of notifications per page.
   * @param {string} request.type - Type of notifications to filter.
   * @param {boolean} newNotificationsOnly - Flag to retrieve only new/unread notifications.
   * @returns {Promise<AxiosResponse<GetNotificationResponse>>} Promise that resolves to the response containing notifications.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  getNotifications: async (
    { page, limit, type }: GetNotificationRequest,
    newNotificationsOnly?: boolean,
  ): Promise<AxiosResponse<GetNotificationResponse>> => {
    try {
      // Make the API request to get notifications
      return await axios.get<GetNotificationResponse>("/user/notifications", {
        params: {
          page,
          limit,
          type,
          unread: newNotificationsOnly,
        },
      });
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },

  /**
   * markNotificationsAsRead
   *
   * Marks notifications as read based on the provided props.
   *
   * @param {MarkNotificationsAsReadRequest} request - Request object containing parameters for the API call.
   * @param {number[]} request.notificationIds - Array of notification IDs to mark as read.
   * @returns {Promise<AxiosResponse<NormalApiSuccessResponse>>} Promise that resolves to the response indicating success.
   * @throws {CustomError} Throws a custom error if the API call fails.
   */
  markNotificationsAsRead: async (
    props: MarkNotificationsAsReadRequest,
  ): Promise<AxiosResponse<NormalApiSuccessResponse>> => {
    try {
      // Make the API request to mark notifications as read
      return await axios.patch<NormalApiSuccessResponse>(
        "/user/notifications/read",
        props,
      );
    } catch (error) {
      // Throw a custom error using a helper function
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};
export default services;
