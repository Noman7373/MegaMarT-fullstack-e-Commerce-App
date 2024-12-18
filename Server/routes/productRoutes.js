import { Router } from "express";
import { createProductController } from "../controllers/ProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateProduct from "../middleware/productMiddleware.js";

const productRoute = Router();

productRoute.post(
  "/product/add",
  authMiddleware,
  validateProduct,
  createProductController
);

export default productRoute;
