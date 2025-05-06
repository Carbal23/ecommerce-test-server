import { Router } from "express";
import { uploadImages } from "../controllers/imagesController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, uploadImages);

export default router;
