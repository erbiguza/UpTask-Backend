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
            "INSERT INTO notes(note, owner_id) VALUES ($1, $2) RETURNING *",
            [note, owner_id],
        );

        res.status(200).json({
            message: "Note created successfully",
            task: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getNotes = async (req, res) => {
    const id = req.user.id;

    try {
        const result = await pool.query(
            "SELECT * FROM notes WHERE owner_id = $1",
            [id],
        );

        res.status(200).json({
            notes: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    const id = req.user.id;
    const note_id = req.params.id;

    try {
        const your_note = await pool.query(
            "SELECT * FROM notes WHERE owner_id = $1 AND id = $2",
            [id, note_id],
        );

        if (your_note.rows.length > 0) {
            await pool.query(
                "DELETE FROM notes WHERE owner_id = $1 AND id = $2",
                [id, note_id],
            );
            res.status(200).json({
                message: "Note deleted succesfully",
            });
        } else {
            res.status(400).json({
                message: "Invalid note",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { createNote, getNotes, deleteNote };
