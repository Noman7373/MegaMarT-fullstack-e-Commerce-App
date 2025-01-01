import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkUserAddressMiddleware } from "../middleware/checkAddressMiddleware.js";
import { createAddressController } from "../controllers/addressController.js";


const addressRoutes = Router();

addressRoutes.post(
  "/create/address",
  authMiddleware,
  checkUserAddressMiddleware,
  createAddressController
);

export default addressRoutes;
