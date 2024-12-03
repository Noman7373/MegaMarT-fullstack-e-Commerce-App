import axios from "axios";

export const fetchExample = async () => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/`);
    setData(response.data);
  } catch (error) {
    setError(error.message);
  }
};
