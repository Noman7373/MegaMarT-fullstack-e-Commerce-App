import { Router } from "express";
import {
  createCartController,
  getCartItemsController,
  updateCartItemsQtyController,
} from "../controllers/cartItemsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const cartRoutes = Router();

cartRoutes.post("/create/cart", authMiddleware, createCartController);
cartRoutes.get("/get-cart", authMiddleware, getCartItemsController);
cartRoutes.put("/update/cart", authMiddleware, updateCartItemsQtyController);

export default cartRoutes;
