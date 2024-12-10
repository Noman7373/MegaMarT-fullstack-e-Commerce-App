import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import DbConnection from "./DB/dbConnect.js";
import router from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import imageRoute from "./routes/uploadImageRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// cors middle ware
app.use(
  cors({
    credentials: true, // able to cookies client side
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false, // for avoid the error to access the backend / frontend
  })
);

app.use("/api/user", router);
app.use("/api/category", categoryRoute);
app.use("/api/file", imageRoute);

mongoose.set("strictQuery", false);
DbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
