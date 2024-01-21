import {
  authInstance as axios,
  googleAuthInstance,
} from "../api-instance/AuthInstance";
import {
  AuthRequest,
  AuthResponse,
  NewTokenResponse,
  SignUpRequest,
} from "./Helper";
import generalFunctions from "../../utils/helpers/functions/GeneralFunctions";
import { AxiosResponse } from "axios";

/**
 * Authentication Services Module
 *
 * This module provides functions for interacting with authentication-related APIs.
 * It includes methods for user sign-up, sign-in, and refreshing access tokens.
 *
 * Functions:
 * - doSignUp: Handles user registration (sign-up) and returns an AuthResponse.
 * - doSignIn: Handles user authentication (sign-in) and returns an AuthResponse.
 * - getNewToken: Requests a new access token using a refresh token and returns a NewTokenResponse.
 *
 * Each function includes error handling using the generalFunctions module to transform
 * Axios errors into standardized API error formats.
 *
 * @exports {Object} authenticationServices
 */
const authenticationServices = {
  googleAuth: async (accessToken: string) => {
    try {
      const response = await googleAuthInstance.get("/", {
        headers: {
          Authorization: "Bearer ".concat(accessToken),
        },
      });
      const { status, data } = response;

      if (status >= 200 && status < 400) {
        return data;
      } else {
        throw new Error(`Request failed with status ${status}`);
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
      throw error;
    }
  },

  /**
   * Handles user registration (sign-up) and returns an AuthResponse.
   *
   * @param {AuthRequest} props - User registration details.
   * @returns {Promise<AuthResponse>} User authentication response.
   */
  doSignUp: async (props: SignUpRequest): Promise<AuthResponse> => {
    return await axios
      .post<AuthResponse>("/sign-up", props)
      .then((response) => response.data)
      .catch((error) => {
        // Re-throw the error with the custom error type
        throw generalFunctions.customError(error);
      });
  },

  /**
   * Handles user authentication (sign-in) and returns an AuthResponse.
   *
   * @param {AuthRequest} props - User authentication details.
   * @returns {Promise<AuthResponse>} User authentication response.
   */
  doSignIn: async (
    props: AuthRequest,
  ): Promise<AxiosResponse<AuthResponse>> => {
    return await axios
      .post<AuthResponse>("/login", props)
      .then((response) => response)
      .catch((error) => {
        // Re-throw the error with the custom error type
        throw generalFunctions.customError(error);
      });
  },

  /**
   * Handles google authentication (sign-in) and returns an AuthResponse.
   *
   * @param {AuthRequest} props - User authentication details.
   * @returns {Promise<AuthResponse>} User authentication response.
   */
  doGoogleSignIn: async ({
    email,
    picture,
  }: {
    email: string;
    picture?: string;
  }): Promise<AxiosResponse<AuthResponse>> => {
    return await axios
      .post<AuthResponse>("/signIn/google", { email, picture })
      .then((response) => response)
      .catch((error) => {
        // Re-throw the error with the custom error type
        throw generalFunctions.customError(error);
      });
  },

  /**
   * Requests a new access token using a refresh token and returns a NewTokenResponse.
   *
   * @param {string} refreshToken - The refresh token.
   * @returns {Promise<NewTokenResponse>} New access token response.
   */
  getNewToken: async (refreshToken: string): Promise<NewTokenResponse> => {
    return await axios
      .post<NewTokenResponse>("/token", {
        refreshToken: refreshToken,
      })
      .then((response) => response.data)
      .catch((error) => {
        // Re-throw the error with the custom error type
        throw generalFunctions.customError(error);
      });
  },
};

export default authenticationServices;
