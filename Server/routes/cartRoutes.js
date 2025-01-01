import { Router } from "express";
import {
  createCartController,
  deleteCartItemsController,
  getCartItemsController,
  updateCartItemsQtyController,
} from "../controllers/cartItemsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const cartRoutes = Router();

cartRoutes.post("/create/cart", authMiddleware, createCartController);
cartRoutes.get("/get-cart", getCartItemsController);
cartRoutes.put("/update/cart", updateCartItemsQtyController);
cartRoutes.delete("/delete/cart", deleteCartItemsController);

export default cartRoutes;
