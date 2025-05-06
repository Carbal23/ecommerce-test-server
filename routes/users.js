import { Router } from "express";
import { newUser } from "../controllers/usersController.js";
import { check } from "express-validator";
import { validateNewUser } from "../validation/user.js";
const router = Router();

router.post("/", validateNewUser, newUser);

export default router;
