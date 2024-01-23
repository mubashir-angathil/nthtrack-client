import { AxiosError, AxiosResponse } from "axios";
import { ApiError, ApiResponse } from "../../../services/Helper";
import { UseFormSetError } from "react-hook-form";
import { labelColors } from "../configs/Colors";

/**
 * General Functions Module
 *
 * This module contains utility functions for handling API errors and field-level errors
 * in the context of form validation.
 *
 * Functions:
 * - customError: Transforms an AxiosError into a standardized ApiError format.
 * - fieldErrorsHandler: Handles field-level errors by updating form validation errors.
 *
 * @exports {Object} generalFunctions
 */
const generalFunctions = {
  /**
   * Transforms an AxiosError into a standardized ApiError format.
   *
   * @param {AxiosError} error - The Axios error response.
   * @returns {ApiError | AxiosError} Standardized API error format.
   */
  customError: (error: AxiosError<ApiError>): ApiError => {
    if (error?.response?.data?.data) {
      const { data } = error.response.data;
      return {
        status: error.response.status,
        data: data,
      } as ApiError;
    } else {
      return {
        status: 404,
        data: {
          success: false,
          message: error.message,
        },
      };
    }
  },

  /**
   * Handles field-level errors by updating form validation errors.
   *
   * @param {ApiError} error - The standardized API error.
   * @param {UseFormSetError<any>} setError - React Hook Form's setError function.
   * @returns {undefined} Void.
   */
  fieldErrorsHandler: (apiError: ApiError, setError: UseFormSetError<any>) => {
    const { data } = apiError;
    if (data.error?.fieldErrors) {
      data.error.fieldErrors.forEach((value) => {
        return setError(value.field, { message: value.message });
      });
      return true;
    }
    return false;
  },
  customResponse: (response: AxiosResponse) => {
    if (response)
      return {
        status: response.status,
        data: response.data,
      } as ApiResponse;

    return response;
  },
  batchLoading: (event: React.SyntheticEvent): boolean => {
    const listBoxNode = event.currentTarget;
    if (
      Math.abs(
        listBoxNode.scrollTop +
          listBoxNode.clientHeight -
          listBoxNode.scrollHeight,
      ) < 1
    ) {
      return true;
    }
    return false;
  },
  goBack: () => history.back(),

  formateNumber: (number: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    });

    return formatter.format(number);
  },
  capitalizeString: (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },
  formatNotificationTimestamp: (date: string) => {
    const now = new Date();
    const notificationDate = new Date(date); // Parse the string into a Date object
    const dateDiff = now.getTime() - notificationDate.getTime(); // Use getTime() to get numeric representation
    const diffInSeconds = Math.floor(dateDiff / 1000);

    if (diffInSeconds < 60) {
      // Less than a minute ago
      return "Just now";
    } else if (diffInSeconds < 3600) {
      // Minutes ago
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      // Hours ago
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 172800) {
      // Yesterday
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return `Yesterday at ${yesterday.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      // Show date and time
      return (
        notificationDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) +
        " " +
        notificationDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  },
  getColor: (index?: number) => {
    const currentColor = index
      ? Object.values(labelColors).at(index)
      : "51, 171, 5";

    return `rgb(${currentColor})`;
  },
};

export default generalFunctions;
