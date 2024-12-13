import { baseURL } from "../Api/apiSummery.js";
import Axios from "../Api/Axios";

const uploadImageUtils = async ({ file }) => {
  if (!file) {
    throw new Error("No image file provided for upload.");
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await Axios.post(`${baseURL}/api/file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during image upload.";
    throw new Error(errorMessage);
  }
};

export default uploadImageUtils;
