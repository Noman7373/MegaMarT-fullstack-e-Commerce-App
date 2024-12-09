import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImagesCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer()); // convert image int0 Buffer

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "MERN-e-commerce" }, (err, uploadResult) => {
        if (err) return reject(err);
        resolve(uploadResult);
      })
      .end(buffer);
  });

  return uploadImage;
};

export default uploadImagesCloudinary;
