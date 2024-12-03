import axios from "axios";
import { baseURL } from "../apiSummery.js";

export const fetchExample = async () => {
  try {
    const response = await axios.post(`${baseURL}/`);
    setData(response.data);
  } catch (error) {
    setError(error.message);
  }
};
