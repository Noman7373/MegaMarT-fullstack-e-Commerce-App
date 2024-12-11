import express from "express";
import {
  AddCategoryController,
  getCategoryProduct,
} from "../controllers/productCategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/add-category", authMiddleware, AddCategoryController);
router.get("/get-category", getCategoryProduct);

export default router;
