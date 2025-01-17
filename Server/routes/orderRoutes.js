import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getOrderHistoryController,
  handleStripeWebhook,
  PaymentByCashController,
  StripePaymentController,
} from "../controllers/order.Controller.js";
const orderRoutes = Router();

orderRoutes.post("/payments/cash", authMiddleware, PaymentByCashController);
orderRoutes.get("/orders/history", authMiddleware, getOrderHistoryController);
orderRoutes.post("/checkout", authMiddleware, StripePaymentController);
orderRoutes.post("/webkook", handleStripeWebhook);

export default orderRoutes;
