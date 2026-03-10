import { Router } from "express";

import {
    getDefaultProfilePictures,
    setProfilePic,
} from "../controllers/profilePicController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const pictureRouter = Router();

pictureRouter.route("/getProfiles").get(getDefaultProfilePictures);
pictureRouter.route("/setPic").post(requireAuth, setProfilePic);

export default pictureRouter;
