import axios from "axios";
import { baseURL } from "./apiSummery.js";
import { refreshAccessToken } from "./Query/userQuery.js";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// send accessToken token to Backend Header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Extend life Access Token with the help of Refres Token
Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      // renew access token
      if (refreshToken) {
        // import refreshAccessToken from userQuery.js
        const newAccessToken = await refreshAccessToken(refreshToken);
        // sending response to the backend
        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          //send request again to Axios
          return Axios(originRequest);
        }
      }
      // if tokens are not availble then send error through Promise Reject
      return Promise.reject(error)
    }
  }
);

// send to Backend
// const refreshAccessToken = async (refreshToken) => {
//   try {
//     const response = await
//   } catch (error) {

//   }
// }

export default Axios;
