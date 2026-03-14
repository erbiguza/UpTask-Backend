import { pool } from "../index.js";

class Task {
    constructor(task = "", priority = "", duedate = "") {
        this.task = task;
        this.priority = priority;
        this.duedate = duedate;
    }

    async createTask(owner_id) {
        if (!owner_id) {
            return { success: false, message: "Please Log In!" };
        }
        try {
            const result = await pool.query(
                "INSERT INTO tasks (owner_id, task, duedate, priority) VALUES ($1, $2, $3, $4) RETURNING *",
                [owner_id, this.task, this.duedate, this.priority],
            );
            return {
                success: true,
                message: "Task Created Successfully!",
                task: result.rows[0],
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getTasks(owner_id) {
        if (!owner_id) {
            return { success: false, message: "Please Log In!" };
        }
        try {
            const result = await pool.query(
                "SELECT * FROM tasks WHERE owner_id = $1 ORDER BY duedate ASC",
                [owner_id],
            );
            return { success: true, tasks: result.rows };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateTask(
        owner_id,
        task_id,
        editedTask,
        editedDate,
        editedPriority,
    ) {
        if (!owner_id || !task_id)
            return { success: false, message: "Please Log In!" };
        try {
            const result = await pool.query(
                "SELECT * FROM tasks WHERE id = $1 AND owner_id = $2",
                [task_id, owner_id],
            );
            if (result.rows.length === 0) {
                return { success: false, message: "Couldn't Find Task!" };
            }

            await pool.query(
                `UPDATE tasks
             SET task = COALESCE($1, task),
                 duedate = COALESCE($2, duedate),
                 priority = COALESCE($3, priority)
             WHERE id = $4 AND owner_id = $5`,
                [editedTask, editedDate, editedPriority, task_id, owner_id],
            );

            return { success: true, message: "Task Updated Successfully!" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteTask(owner_id, task_id) {
        if (!owner_id || !task_id) {
            return { success: false, message: "Cannot Delete Task!" };
        }
        try {
            const result = await pool.query(
                "SELECT * FROM tasks WHERE owner_id = $1 AND id = $2",
                [owner_id, task_id],
            );
            if (result.rows.length > 0) {
                await pool.query(
                    "DELETE FROM tasks WHERE owner_id = $1 AND id = $2",
                    [owner_id, task_id],
                );
                return { success: true, message: "Task Deleted Successfully!" };
            }
            return { success: false, message: "Couldn't Find Task!" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default Task;
