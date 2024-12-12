import express from "express";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryProduct,
  updateCategory,
} from "../controllers/productCategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/add-category", authMiddleware, AddCategoryController);
router.get("/get-category", getCategoryProduct);
router.put("/update-category/:id", authMiddleware, updateCategory);
router.delete("/category-delete", authMiddleware, deleteCategoryController);

export default router;
