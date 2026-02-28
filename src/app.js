import express from "express";
import authRouter from "./routes/authRoutes.js";

export const startApp = () => {
    const app = express();

    app.use(express.json());

    app.use("/api/v1/auth", authRouter);

    return app;
};
