import express from "express";
import { signup, login, isAuth } from "../Controllers/AuthController.js";
import { signupValidation, loginValidation } from "../Middlewares/AuthValidation.js";

const router = express.Router();

// ✅ Authentication routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

// ✅ Check authentication route
router.get("/is-auth", isAuth);

export default router;
