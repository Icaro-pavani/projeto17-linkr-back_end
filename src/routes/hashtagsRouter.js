import { Router } from "express";

import { getTrendingHashtags } from "../controllers/hashtagsController.js";
import validToken from "../middlewares/validToken.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/trending", validToken, getTrendingHashtags);

export default hashtagsRouter;