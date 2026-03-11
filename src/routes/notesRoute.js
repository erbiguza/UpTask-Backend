import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createNote } from "../controllers/notesController.js";

const noteRouter = Router();

noteRouter.route("/createNote").post(requireAuth, createNote);

export default noteRouter;
