import dotenv from "dotenv";

dotenv.config("../.env");

import { startApp } from "./app.js";
import { createPool } from "./config/database.js";

const pool = createPool();
const app = startApp();

const startServer = async () => {
    try {
        const connection = await pool.connect();
        console.log("PostgreSQL connected!");
        connection.release();

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Error connecting to database!");
    }
};

startServer();

export { pool };
