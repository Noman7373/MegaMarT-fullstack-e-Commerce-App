import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSubcategories,
  subCategoryController,
} from "../controllers/subCategoryController.js";

const route = Router();

route.post("/add-Subcategory", authMiddleware, subCategoryController);
route.post("/get-subcategories", getSubcategories);

export default route;
