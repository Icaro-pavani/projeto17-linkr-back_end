import { Router } from "express";
import {
  checkFollow,
  followUser,
  unfollowUser,
} from "../controllers/followController.js";

import validToken from "../middlewares/validToken.js";

const followRouter = Router();

followRouter.post("/follow/:id", validToken, followUser);
followRouter.delete("/follow/:id", validToken, unfollowUser);
followRouter.get("/follow/:id", validToken, checkFollow);

export default followRouter;
