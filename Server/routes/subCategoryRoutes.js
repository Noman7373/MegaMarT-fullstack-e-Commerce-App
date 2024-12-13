import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { subCategoryController } from "../controllers/subCategoryController.js";

const route = Router();

route.post("/add-Subcategory", authMiddleware, subCategoryController);

export default route;
