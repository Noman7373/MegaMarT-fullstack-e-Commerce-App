import axios from "axios";
import { baseURL } from "./apiSummery.js";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default Axios;
