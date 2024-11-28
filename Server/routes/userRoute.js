import { Router } from "express";
import registerUsersController from "../controllers/usersController.js";

const router = Router();

router.post("/register", registerUsersController);

export default router;
