import { AxiosError, AxiosResponse } from "axios";
import axios from "../api-instance/Instance";
import { SelectFieldApiResponse } from "./Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import { ApiError } from "../Helper";
const dataServices = {
  /**
   * getAllTrackers
   *
   * Retrieves all trackers.
   *
   * @returns {Promise<AxiosResponse<ProjectResponse>>} Promise that resolves to the response containing project data.
   */
  getTrackers: async (): Promise<AxiosResponse<SelectFieldApiResponse>> => {
    try {
      const response = await axios.get<SelectFieldApiResponse>("data/trackers");
      return response;
    } catch (error) {
      throw generalFunctions.customError(error as AxiosError<ApiError>);
    }
  },
};

export default dataServices;
