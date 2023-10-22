import Cookies from "universal-cookie";
import { AuthResponse } from "../auth-services/Helper";
import { Tokens } from "./Helper";

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
  setAuthDetails: (authDetails: AuthResponse["authDetails"]): void => {
    cookie.set(authDetailsCookie, JSON.stringify(authDetails));
  },

  /**
   * getAuthDetails
   *
   * Retrieves the stored authentication details from the cookie.
   *
   * @returns {AuthResponse["authDetails"] | undefined} Stored authentication details.
   */
  getAuthDetails: (): AuthResponse["authDetails"] | undefined => {
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
  clearAuthDetails: (): void => {
    // Remove the authentication details cookie
    return cookie.remove(authDetailsCookie);
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
