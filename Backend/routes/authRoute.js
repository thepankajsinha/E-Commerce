import express from "express";
import { getProfile, login, logout, signup } from "../controllers/authController.js";
import {protectRoute} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);

export default router;