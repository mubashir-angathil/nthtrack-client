import { AxiosError } from "axios";
import { ApiError } from "../../../services/Helper";
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
  customError: (error: AxiosError): ApiError | AxiosError => {
    if (error.response)
      return {
        status: error.response.status,
        data: error.response.data as ApiError["data"],
      } as ApiError;

    return error;
  },

  /**
   * Handles field-level errors by updating form validation errors.
   *
   * @param {ApiError} error - The standardized API error.
   * @param {UseFormSetError<any>} setError - React Hook Form's setError function.
   * @returns {undefined} Void.
   */
  fieldErrorsHandler: (
    error: ApiError,
    setError: UseFormSetError<any>,
  ): void => {
    const {
      data: { fieldErrors },
    } = error;

    if (fieldErrors)
      Object.entries(fieldErrors).every(([key, value]: [string, any]) => {
        setError(key, { message: value });
      });
  },
};

export default generalFunctions;
