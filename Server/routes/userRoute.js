import { Router } from "express";
import {
  registerUsersController,
  verifyUserEmailController,
  userLoginController,
  logOutController,
  uploadAvatarController,
  updateUserDetailsController,
  forgotPasswordController,
  verifyOtp,
  resetPassword,
  refreshTokenController,
  getUserLoginDetails,
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uplaod from "../middleware/multer.js";

const router = Router();

router.post("/register", registerUsersController);
router.post("/login", userLoginController);
router.post("/verify-email", verifyUserEmailController);
router.get("/logout", authMiddleware, logOutController);
// Avatar uplaod route
router.put(
  "/upload-avatar",
  authMiddleware,
  uplaod.single("avatar"),
  uploadAvatarController
);
router.put("/update-profile/:id", updateUserDetailsController);
router.put("/forgot-password", forgotPasswordController);
router.put("/verify-forgotpassword-otp", verifyOtp);
router.put("/reset-password/:id", resetPassword);
router.post("/refresh-token", refreshTokenController);
// get user Detials Route
router.get("/getuser-details", authMiddleware, getUserLoginDetails);

export default router;
