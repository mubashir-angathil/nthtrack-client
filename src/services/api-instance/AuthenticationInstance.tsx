import axios from "axios";
import { AUTH_URL } from "../../utils/helpers/configs/Configs";
const authenticationInstance = axios.create({
  baseURL: AUTH_URL,
});
export default authenticationInstance;
