// import axios from "axios";
// import { AUTH_URL } from "../../helpers/configs/Configs";
// const instance = axios.create({
//   baseURL: AUTH_URL,
// });
// instance.interceptors.request.use(
//   (config) => {
//     const user = { accessToken: "asd" };
//     if (user.accessToken) {
//       config.headers.Authorization = `Bearer ${user.accessToken}`;
//     }
//     return config;
//   },
//   async (error) => {
//     return await Promise.reject(error);
//   },
// );
// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     let originalConfig = err.config;
//     if (originalConfig === undefined) originalConfig = { url: "" };
//     if (originalConfig.url && err.response) {
//       // Access Token was expired
//       if (
//         err.response.status === 401 &&
//         err.response.data.message === "TokenExpiredError" &&
//         !originalConfig._retry
//       ) {
//         originalConfig._retry = true;
//         try {
//           const user = storageService.getUser();
//           const [tokenRes, permissionRes] = await Promise.all([
//             await AUTH_SERVICES.regenerateAccessToken({
//               idToken: user.idToken,
//               officeId: Number(user.officeId),
//             }),
//             await AUTH_SERVICES.getPermissions({
//               idToken: user.idToken,
//               officeId: Number(user.officeId),
//             }),
//           ]);

//           user.accessToken = tokenRes.data.accessToken;
//           user.permission = permissionRes.data.data;
//           storageService.updateUser(user);

//           return await instance(originalConfig);
//         } catch (_error) {
//           return await Promise.reject(_error);
//         }
//       }
//     }
//     return await Promise.reject(err);
//   },
// );
// export default instance;
