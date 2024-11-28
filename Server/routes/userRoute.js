import { Router } from "express";
import {
  registerUsersController,
  verifyUserEmailController,
  userLoginController,
} from "../controllers/usersController.js";

const router = Router();

router.post("/register", registerUsersController);
router.post("/login", userLoginController);
router.post("/verify-email", verifyUserEmailController);

export default router;
