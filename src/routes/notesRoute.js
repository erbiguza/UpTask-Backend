import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
    createNote,
    getNotes,
    deleteNote,
} from "../controllers/notesController.js";

const noteRouter = Router();

noteRouter.route("/createNote").post(requireAuth, createNote);
noteRouter.route("/getNotes").get(requireAuth, getNotes);
noteRouter.route("/deleteNote/:id").delete(requireAuth, deleteNote);

export default noteRouter;
