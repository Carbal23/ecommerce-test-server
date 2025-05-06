import { Router } from "express";
import {
  authenticateUser,
  getAuthenticatedUser,
} from "../controllers/authController.js";
import { check } from "express-validator";
import authMiddleware from "../middlewares/auth.js";
import { validateAuthUser } from "../validation/auth.js";

const router = Router();

router.get("/", authMiddleware, getAuthenticatedUser);

router.post(
  "/",
  validateAuthUser,
  authenticateUser
);

export default router;
