import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  deleteSubcategoriesController,
  getSubcategories,
  subCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategoryController.js";

const route = Router();

route.post("/add-Subcategory", authMiddleware, subCategoryController);
route.post("/get-subcategories", getSubcategories);
route.put(
  "/update-subcategories/:id",
  authMiddleware,
  updateSubCategoryController
);
route.delete(
  "/delete-subcategory",
  authMiddleware,
  deleteSubcategoriesController
);

export default route;
