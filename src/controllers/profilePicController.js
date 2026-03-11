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

const setProfilePic = async (req, res) => {
    const id = req.user.id;
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        const user = result.rows[0];

        if (user.profile_pic.includes("/uploads")) {
            const filepath = `public/images/profiles${user.profile_pic}`;
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log("Error Deleting File");
                    return;
                }
                console.log("File deleted successfuly");
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
    if (!req.file) {
        const { profilePic } = req.body;

        try {
            const result = await pool.query(
                "UPDATE users SET profile_pic = $1 WHERE id = $2",
                [profilePic, id],
            );

            res.status(200).json({
                message: "Profile pic updated",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    } else {
        const filename = `/uploads/${req.file.filename}`;

        try {
            const result = await pool.query(
                "UPDATE users SET profile_pic = $1 WHERE id = $2",
                [filename, id],
            );

            res.status(200).json({
                message: "Profile pic updated",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
};

export { getDefaultProfilePictures, setProfilePic };
