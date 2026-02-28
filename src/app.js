import express from "express";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

export const startApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use("/api/v1/auth", authRouter);

    return app;
};
