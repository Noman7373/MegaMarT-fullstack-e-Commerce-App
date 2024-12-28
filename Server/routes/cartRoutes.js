import { Router } from "express";
import { createCartController } from "../controllers/cartItemsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const cartRoutes = Router();

cartRoutes.post("/cart/create", authMiddleware, createCartController);

export default cartRoutes;
