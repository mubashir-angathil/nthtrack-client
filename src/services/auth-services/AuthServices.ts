import { AxiosResponse } from "axios";
import axios from "../api-instance/AuthenticationInstance";
import { AuthRequest, AuthResponse, NewTokenResponse } from "./Helper";

const authenticationServices = {
  doSignUp: async (props: AuthRequest) => {
    return axios
      .post<AxiosResponse<AuthResponse>>("/sign-up", props)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response; // Re-throw the error to propagate it
      });
  },
  doSignIn: async (props: AuthRequest) => {
    return axios
      .post<AxiosResponse<AuthResponse>>("/sign-in", props)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response; // Re-throw the error to propagate it
      });
  },
  getNewToken: async (refreshToken: string) => {
    return axios
      .post<AxiosResponse<NewTokenResponse>>("/token", {
        refreshToken: refreshToken,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error.response; // Re-throw the error to propagate it
      });
  },
};

export default authenticationServices;
