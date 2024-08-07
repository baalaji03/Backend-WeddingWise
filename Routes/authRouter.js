import express from "express";
import { loginUser, registerUser,google, getUser } from "../Controllers/auth.controller.js";

const router = express.Router();

router.get("/", (_, res) => {       
    res.send("Welcome to Auth provider routes");
});

router.post("/register-user", registerUser);
router.post("/login-user", loginUser );
router.post("/google",google);
router.get("/users",getUser);

export default router;

