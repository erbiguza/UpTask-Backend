import { pool } from "../index.js";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const getDefaultProfilePictures = async (req, res) => {
    try {
        const defaultsPath = "public/images/profiles/defaults";

        const files = await fs.readdir(defaultsPath);
        const imageNames = files.map((file) => {
            return `/defaults/${file}`;
        });

        res.status(200).json(imageNames);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { getDefaultProfilePictures };
