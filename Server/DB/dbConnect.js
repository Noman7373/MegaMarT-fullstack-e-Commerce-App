import mongoose from "moongose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("Please Provide MongoDB URL");
}

const DbConnection = async () => {
  try {
    const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
    await mongoose.connect(URL);
    console.log("Connected Successfullu");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;
