import { Router } from "express";
import { createProductController } from "../controllers/ProductController.js";

const productRoute = Router();

productRoute.post("/products/add", createProductController);

export default productRoute;
