import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { uploadImagesToCloudinary } from "../controllers/uploadCloudinaryController.js";

const router = Router();

router.post("/", authMiddleware, uploadImagesToCloudinary);

export default router;
