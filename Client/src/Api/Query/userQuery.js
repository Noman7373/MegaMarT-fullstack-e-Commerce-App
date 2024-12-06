import axios from "axios";
import Axios from "../Axios";
import { baseURL } from "../apiSummery.js";

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/register`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userLogIn = async ({ email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userForgotPassword = async ({ email }) => {
  try {
    const response = await Axios.put(`${baseURL}/api/user/forgot-password`, {
      email,
    });
    return response;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const verifyOTP = async ({ otp, email }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/user/verify-forgotpassword-otp`,
      {
        otp,
        email,
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const resetPassword = async ({ id, newPassword, confirmNewPassword }) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/user/reset-password/${id}`,
      {
        id,
        newPassword,
        confirmNewPassword,
      }
    );
    return response;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// logout Function

const logOutUser = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/logout`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// expend the life of accessToken with the help of RefreshToken
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.put(`${baseURL}/api/user/refresh-token`, {
      refreshToken,
    });
    const accessToken = response.data.tokens.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// fetch User Details API
const getUserLoginDetails = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/getuser-details`);
    return response;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export {
  registerUser,
  userLogIn,
  userForgotPassword,
  verifyOTP,
  resetPassword,
  logOutUser,
  refreshAccessToken,
  getUserLoginDetails,
};
