import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import pictureRouter from "./routes/pictureRoute.js";
import noteRouter from "./routes/notesRoute.js";
import taskRouter from "./routes/taskRoutes.js";

export const startApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static("public"));
    app.use(
        cors({
            origin: [
                `${process.env.REACT_FRONTEND_URL}`,
                "http://192.168.1.9:5173",
            ],
            credentials: true,
        }),
    );

    app.use(`${process.env.API}/auth`, authRouter);
    app.use(`${process.env.API}/pictures`, pictureRouter);
    app.use(`${process.env.API}/notes`, noteRouter);
    app.use(`${process.env.API}/tasks`, taskRouter);

    return app;
};
