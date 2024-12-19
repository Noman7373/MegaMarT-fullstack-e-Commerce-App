import { Router } from "express";
import {
  createProductController,
  getAllProductController,
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

export default productRoute;
