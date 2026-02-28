import { Router } from "express";
import { signup, login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

export default authRouter;
