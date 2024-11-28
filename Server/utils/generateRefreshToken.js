import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "3d" }
  );

  const updateToken = await userModel.updateOne(
    {
      _id: userId,
    },
    {
      refresh_token: token,
    }
  );

  return token;
};

export default generateRefreshToken;
