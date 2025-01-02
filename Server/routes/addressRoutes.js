import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkUserAddressMiddleware } from "../middleware/checkAddressMiddleware.js";
import {
  createAddressController,
  getUsersAddressController,
} from "../controllers/addressController.js";

const addressRoutes = Router();

addressRoutes.post(
  "/create/address",
  authMiddleware,
  checkUserAddressMiddleware,
  createAddressController
);
addressRoutes.get("/get/address", authMiddleware, getUsersAddressController);

export default addressRoutes;
