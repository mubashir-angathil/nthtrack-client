import axios from "../api-instance/AuthenticationInstance";

const authenticationServices = {
  doSignUp: async () => {
    return axios
      .post("/sign-up", { username: "me@gmail.com", password: "12345" })
      .then((response) => response.data)
      .catch((error) => {
        throw error.response; // Re-throw the error to propagate it
      });
  },
};

export default authenticationServices;
