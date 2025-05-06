import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createProduct,
  getProducts,
  getProductById,
  rateProduct,
} from "../controllers/productController.js";
import {
  validateNewProduct,
  validateRateProduct,
} from "../validation/product.js";

const router = Router();

router.post("/", authMiddleware, validateNewProduct, createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.patch("/:id/rate", authMiddleware, validateRateProduct, rateProduct);

export default router;
