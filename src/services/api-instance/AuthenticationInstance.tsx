import axios from "axios";
import { AUTH_URL } from "../../utils/helpers/configs/Configs";

// Create an instance of axios for authentication-related requests
const authenticationInstance = axios.create({
  // Set the base URL for authentication requests
  baseURL: AUTH_URL,
});

export default authenticationInstance;
