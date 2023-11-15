import { AxiosError, AxiosResponse } from "axios";
import axios from "../api-instance/Instance";
import { SelectFieldApiResponse, Teams } from "./Helper";
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
  getTrackers: async (): Promise<AxiosResponse<SelectFieldApiResponse>> => {
    try {
      const response = await axios.get<SelectFieldApiResponse>("data/trackers");
      return response;
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
  getStatus: async (): Promise<AxiosResponse<SelectFieldApiResponse>> => {
    try {
      const response = await axios.get<SelectFieldApiResponse>("data/statuses");
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
};

export default dataServices;
