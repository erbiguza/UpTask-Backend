import { pool } from "../index.js";

const createNote = async (req, res) => {
    const owner_id = req.user.id;
    const { note } = req.body;

    if (!note || !owner_id) {
        return res.status(400).json({
            message: "Please insert a note",
        });
    }
    try {
        const result = await pool.query(
            "INSERT INTO notes(note, owner_id) VALUES ($1, $2)",
            [note, owner_id],
        );
        res.status(200).json({
            message: "Note created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { createNote };
