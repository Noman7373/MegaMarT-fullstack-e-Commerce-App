import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { PaymentByCashController } from "../controllers/order.Controller.js";
const orderRoutes = Router();

orderRoutes.post("/payments/cash", authMiddleware, PaymentByCashController);
orderRoutes.get("/orders/history", authMiddleware, getOrderHistoryController);

export default orderRoutes;
