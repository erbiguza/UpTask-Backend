import { Router } from "express";

import { requireAuth } from "../middleware/authMiddleware.js";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    finishTask,
} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.route("/createTask").post(requireAuth, createTask);
taskRouter.route("/getTasks").get(requireAuth, getTasks);
taskRouter.route("/updateTask/:id").patch(requireAuth, updateTask);
taskRouter.route("/deleteTask/:id").delete(requireAuth, deleteTask);
taskRouter.route("/finishTask/:id").patch(requireAuth, finishTask);

export default taskRouter;
