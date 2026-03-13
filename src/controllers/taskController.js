import Task from "../models/taskModel.js";

const createTask = async (req, res) => {
    const { task, priority, duedate } = req.body;
    const owner_id = req.user.id;

    try {
        let newTask = new Task(task, priority, duedate);

        const result = await newTask.createTask(owner_id);

        console.log(result);
        if (result.success === true) {
            res.status(200).json({
                message: result.message,
            });
        } else if (result.error) {
            throw new Error({ message: result.error });
        } else {
            res.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getTasks = async (req, res) => {
    const id = req.user.id;

    try {
        const result = await Task.getTasks(id);
        if (result.success === true) {
            res.status(200).json(result);
        } else if (result.error) {
            throw new Error({ message: result.error });
        } else {
            res.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    const { new_task, new_duedate, new_priority } = req.body;
    const task_id = req.params.id;
    const user_id = req.user.id;

    if (!new_duedate && !new_priority && !new_task) {
        return res.status(400).json({
            message: "Please insert an update!",
        });
    }

    const safeTask = new_task || null;
    const safeDueDate = new_duedate || null;
    const safeNewPriority = new_priority || null;
    try {
        const result = await Task.updateTask(
            user_id,
            task_id,
            safeTask,
            safeDueDate,
            safeNewPriority,
        );
        if (result.success === true) {
            res.status(200).json(result);
        } else if (result.error) {
            throw new Error(result.error);
        } else {
            res.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    const user_id = req.user.id;
    const task_id = req.params.id;
    try {
        const result = await Task.deleteTask(user_id, task_id);

        if (result.success === true) {
            res.status(200).json(result);
        } else if (result.error) {
            throw new Error(result.error);
        } else {
            res.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { createTask, getTasks, updateTask, deleteTask };
