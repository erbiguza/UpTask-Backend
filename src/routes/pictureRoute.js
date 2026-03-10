import { Router } from "express";

import { getDefaultProfilePictures } from "../controllers/profilePicController.js";

const pictureRouter = Router();

pictureRouter.route("/getProfiles").get(getDefaultProfilePictures);

export default pictureRouter;
