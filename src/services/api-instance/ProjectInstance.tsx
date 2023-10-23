import axios from "axios";
import { APP_URL } from "../../utils/helpers/configs/Configs";
import cookieServices from "../storage-services/CookieServices";
import { Tokens } from "../storage-services/Helper";
import authenticationServices from "../auth-services/AuthServices";
import { MessageHelper } from "../../utils/helpers/constants/Constants";

// Create a new axios instance for project-related API requests
const projectInstance = axios.create({
  baseURL: APP_URL,
});

// Request interceptor to attach the access token to outgoing requests
projectInstance.interceptors.request.use(
  (config) => {
    // Retrieve the access token from cookies
    const tokens: Tokens | undefined = cookieServices.getAuthTokens();

    // Check if the access token is available and attach it to the Authorization header
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    // Return the modified request configuration
    return config;
  },
  // Asynchronous error handling for the request interceptor
  async (error) => {
    // Reject the promise with the error
    return await Promise.reject(error);
  },
);

// Response interceptor for handling token expiration
projectInstance.interceptors.response.use(
  // Resolve the response for successful requests
  (response) => Promise.resolve(response),
  async (error) => {
    // Extract error information from the response data
    const errorInfo = error.response.data;

    // Check if the error is due to a token expiration and unauthorized status
    if (
      errorInfo.error === "TokenExpiredError" &&
      error.response.status === 401
    ) {
      try {
        // Retrieve the existing refresh token from cookies
        const tokens = cookieServices.getAuthTokens();

        // Check if a refresh token is available
        if (tokens?.refreshToken) {
          // Request a new access token using the refresh token
          const response = await authenticationServices.getNewToken(
            tokens.refreshToken,
          );

          // Check if the new access token is obtained successfully
          if (response.success) {
            // Update the access token in cookies
            cookieServices.updateAccessToken(response.accessToken);

            // Update the Authorization header in the original request config
            error.config.headers.Authorization = `Bearer ${response.accessToken}`;

            // Create a new axios instance with the original baseURL
            const newAxiosInstance = axios.create({
              baseURL: error.config.baseURL,
            });

            // Retry the original request with the new axios instance
            return newAxiosInstance(error.config);
          }
        }
      } catch (error: any) {
        // Handle any errors during token refresh or retry
        if (error?.data) {
          if (error.data.error === "jwt expired" && error.status === 403) {
            if (confirm(MessageHelper.reSignInAlert)) {
              // Clear authentication details and redirect to the login page
              cookieServices.clearAuthDetails();
              document.location.href = "/";
            }
          }
        }
        // Reject the promise with the error
        return Promise.reject(error);
      }
    }

    // Reject the promise with the original error for other cases
    return Promise.reject(error);
  },
);

export default projectInstance;
