import express from "express";
import { loginUser, registerUser , google } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser );
router.post("/google",google);

export default router;
