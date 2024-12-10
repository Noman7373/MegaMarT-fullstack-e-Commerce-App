import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadImageController from "../controllers/uploadImageController.js";
import uplaod from "../middleware/multer.js";

const uploadImageRouter = Router();

uploadImageRouter.post(
  "/upload",
  authMiddleware,
  uplaod.single("image"),
  uploadImageController
);

export default uploadImageRouter;
