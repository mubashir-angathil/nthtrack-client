import { AxiosError, AxiosResponse } from "axios";
import { ApiError, ApiResponse } from "../../../services/Helper";
import { UseFormSetError } from "react-hook-form";

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
    if (error?.response?.data) {
      return {
        status: error.response.data.status,
        data: error?.response?.data.data,
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
  fieldErrorsHandler: (
    apiError: ApiError,
    setError: UseFormSetError<any>,
  ): void => {
    const {
      data: { error },
    } = apiError;
    if (error?.fieldErrors)
      error.fieldErrors.forEach((value) => {
        return setError(value.field, { message: value.message });
      });
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
};

export default generalFunctions;
