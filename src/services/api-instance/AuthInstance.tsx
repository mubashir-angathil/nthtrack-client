import axios from "axios";
import { AUTH_URL, GOOGLE_AUTH_URL } from "../../utils/helpers/configs/Configs";

// Create an instance of axios for authentication-related requests
export const authInstance = axios.create({
  // Set the base URL for authentication requests
  baseURL: AUTH_URL,
});

export const googleAuthInstance = axios.create({
  // Set the base URL for authentication requests
  baseURL: GOOGLE_AUTH_URL,
});
