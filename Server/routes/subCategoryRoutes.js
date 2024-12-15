import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
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

export default route;
