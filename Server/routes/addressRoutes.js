import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkUserAddressMiddleware } from "../middleware/checkAddressMiddleware.js";
import {
  createAddressController,
  deleteUsersAddressController,
  getUsersAddressController,
  updateUsersAddressController,
} from "../controllers/addressController.js";

const addressRoutes = Router();

addressRoutes.post(
  "/create/address",
  authMiddleware,
  checkUserAddressMiddleware,
  createAddressController
);
addressRoutes.get("/get/address", getUsersAddressController);
addressRoutes.delete("/delete/address", deleteUsersAddressController);
addressRoutes.put("/update/address", updateUsersAddressController);

export default addressRoutes;
