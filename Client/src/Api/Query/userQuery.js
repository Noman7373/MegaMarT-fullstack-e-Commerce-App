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

export { registerUser, userLogIn };
