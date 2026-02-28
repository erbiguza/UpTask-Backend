import { Router } from "express";
import {
    signup,
    login,
    logout,
    getUser,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/getUser").get(getUser);

export default authRouter;
