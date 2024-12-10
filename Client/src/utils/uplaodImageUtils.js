import { baseURL } from "../Api/apiSummery.js";
import Axios from "../Api/Axios";

const uplaodImageUtils = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await Axios.post(`${baseURL}/api/file/upload`, formData);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

export default uplaodImageUtils;
