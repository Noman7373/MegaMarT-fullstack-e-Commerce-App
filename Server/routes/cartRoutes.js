import { Router } from "express";
import {
  createCartController,
  deleteCartItemsController,
  getCartItemsController,
  updateCartItemsQtyController,
} from "../controllers/cartItemsController.js";


const cartRoutes = Router();

cartRoutes.post("/create/cart", createCartController);
cartRoutes.get("/get-cart", getCartItemsController);
cartRoutes.put("/update/cart", updateCartItemsQtyController);
cartRoutes.delete("/delete/cart", deleteCartItemsController);

export default cartRoutes;
