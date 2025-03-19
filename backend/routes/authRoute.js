import express from "express";
import { login, signUp, logout,checkAuth } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth",protectRoute,checkAuth)
export default router;
