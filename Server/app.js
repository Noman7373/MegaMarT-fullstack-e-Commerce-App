import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import DbConnection from "./DB/dbConnect.js";
dotenv.config();

const app = express();
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

const PORT = process.env.PORT || 8000;

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
