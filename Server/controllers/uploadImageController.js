import uploadImagesCloudinary from "../utils/uploadImages.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    const uplaodImageCloudinary = await uploadImagesCloudinary(file);

    return res.status(200).json({
      message: "Image Uploaded Successfully",
      error: false,
      success: true,
      uploadImage: uplaodImageCloudinary,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
