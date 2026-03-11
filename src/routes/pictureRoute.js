import { Router } from "express";

import {
    getDefaultProfilePictures,
    setProfilePic,
} from "../controllers/profilePicController.js";
import { upload } from "../middleware/uploadsMiddleware.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const pictureRouter = Router();

pictureRouter.route("/getProfiles").get(getDefaultProfilePictures);
pictureRouter.route("/setPic").post(requireAuth, setProfilePic);
pictureRouter
    .route("/upload")
    .post(requireAuth, upload.single("image"), setProfilePic);

export default pictureRouter;
