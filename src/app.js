import express from "express";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const startApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            origin: `${process.env.REACT_FRONTEND_URL}`,
            credentials: true,
        }),
    );

    app.use(`${process.env.API}/auth`, authRouter);

    return app;
};
