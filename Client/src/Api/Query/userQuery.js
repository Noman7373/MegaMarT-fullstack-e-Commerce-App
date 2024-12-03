import Axios from "../Axios";

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await Axios.post(
      `http://localhost:8000/api/user/register`,
      {
        name,
        email,
        password,
      }
    );
    return response;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export { registerUser };
