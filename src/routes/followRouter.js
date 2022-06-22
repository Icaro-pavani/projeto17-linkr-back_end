import { Router } from "express";
import {
  checkFollow,
  followUser,
  sendAllFollows,
  unfollowUser,
} from "../controllers/followController.js";

import validToken from "../middlewares/validToken.js";

const followRouter = Router();

followRouter.post("/follow/:id", validToken, followUser);
followRouter.delete("/follow/:id", validToken, unfollowUser);
followRouter.get("/follow/:id", validToken, checkFollow);
followRouter.get("/follows", validToken, sendAllFollows);

export default followRouter;
