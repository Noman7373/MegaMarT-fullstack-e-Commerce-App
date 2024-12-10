import express from "express";
import AddCategoryController from "../controllers/productCategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/add-category", authMiddleware, AddCategoryController);

export default router;
