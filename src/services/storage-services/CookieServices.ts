import Cookies from "universal-cookie";
import { AuthResponse } from "../auth-services/Helper";
import { Tokens } from "./Helper";
import { AuthContextProps } from "../../utils/helpers/context/auth-context/Helper";

// Create an instance of universal-cookie
const cookie = new Cookies();

// Cookie key for storing authentication details
const authDetailsCookie = "authDetails";

/**
 * cookieServices
 *
 * Utility functions for handling authentication details using cookies.
 */
const cookieServices = {
  /**
   * setAuthDetails
   *
   * Sets the authentication details in the cookie.
   *
   * @param {AuthResponse["authDetails"]} authDetails - Authentication details to be stored.
   */
  setAuthDetails: (authDetails: AuthResponse["data"]): void => {
    cookie.set(authDetailsCookie, JSON.stringify(authDetails));
  },

  /**
   * getAuthDetails
   *
   * Retrieves the stored authentication details from the cookie.
   *
   * @returns {AuthResponse["authDetails"] | undefined} Stored authentication details.
   */
  getAuthDetails: (): AuthResponse["data"] | undefined => {
    const authDetails = cookie.get(authDetailsCookie);
    return authDetails;
  },

  /**
   * getUserDetails
   *
   * Retrieves user details from stored authentication details.
   *
   * @returns {object | undefined} User details (username and id).
   */
  getUserDetails: (): object | undefined => {
    const authDetails = cookie.get(authDetailsCookie);
    if (authDetails) {
      const { username, id } = authDetails;
      const userDetails = { username, id };
      return userDetails;
    }
    return undefined;
  },

  /**
   * updateUserName
   *
   * Updates the username in the user's authentication details stored in cookies.
   *
   * @param {string} username - New username to be set.
   * @returns {AuthContextProps["authDetails"]["user"] | undefined} Updated user details if successful, undefined otherwise.
   */
  updateUserName: (
    username: string,
  ): AuthContextProps["authDetails"]["user"] | undefined => {
    // Get existing authentication details from cookies
    const authDetails = cookie.get(authDetailsCookie);

    // Check if authentication details exist
    if (authDetails) {
      // Create new authentication details with updated username
      const newAuthDetails = { ...authDetails, username };

      // Set updated authentication details in cookies
      cookieServices.setAuthDetails(newAuthDetails);
      // Return the updated user details
      return newAuthDetails;
    }
    // Return undefined if authentication details are not found
  },

  /**
   * getAuthTokens
   *
   * Retrieves access and refresh tokens from stored authentication details.
   *
   * @returns {object | undefined} Authentication tokens.
   */
  getAuthTokens: (): Tokens | undefined => {
    const authDetails = cookie.get(authDetailsCookie);
    if (authDetails) {
      const { accessToken, refreshToken } = authDetails;
      const tokens = { accessToken, refreshToken };
      return tokens;
    }
    return undefined;
  },

  /**
   * clearAuthDetails
   *
   * Clears the stored authentication details from the cookie.
   */
  clearAuthDetails: (): boolean => {
    // Remove the authentication details cookie
    try {
      cookie.remove(authDetailsCookie);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * updateAccessToken
   *
   * Updates the access token in the stored authentication details cookie.
   *
   * @param {string} accessToken - The new access token.
   */
  updateAccessToken: (accessToken: string) => {
    // Retrieve the current authentication details from the cookie
    const authDetails = cookieServices.getAuthDetails();

    // Create a new authentication details object with the updated access token
    const newAuthDetails = { ...authDetails, accessToken };

    // Set the updated authentication details in the cookie
    cookie.set(authDetailsCookie, newAuthDetails);
  },
};

export default cookieServices;
