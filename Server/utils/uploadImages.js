import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImagesCloudinary = async (image) => {
  try {
    // Ensure the image is in Buffer format
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer?.() || []);

    // Upload to Cloudinary using a stream
    const uploadImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "MERN-e-commerce" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return uploadImage;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export default uploadImagesCloudinary;
