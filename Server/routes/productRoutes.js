import { Router } from "express";
import {
  createProductController,
  getAllProductController,
  getProductByCategory,
  getProductBySubcategory,
  getProductDetails,
} from "../controllers/ProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateProduct from "../middleware/productMiddleware.js";

const productRoute = Router();

productRoute.post(
  "/product",
  authMiddleware,
  validateProduct,
  createProductController
);
productRoute.post("/product/all", getAllProductController);
productRoute.post("/product/by-category", getProductByCategory);
productRoute.post("/product/by-category&subcategory", getProductBySubcategory);
productRoute.post("/product/details", getProductDetails);

export default productRoute;
