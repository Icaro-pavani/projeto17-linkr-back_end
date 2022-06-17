import { Router } from "express";
import { checkPostLikes, getPosts, likePost } from "../controllers/postsController.js";
import { publishPost } from "../controllers/postsController.js";
import validSchema from "../middlewares/validSchemas.js";
import publishingSchema from "../schemas/publishingSchema.js";
import validToken from "../middlewares/validToken.js"

const postsRouter = Router();

postsRouter.get("/posts", getPosts);
postsRouter.post("/posts", validSchema(publishingSchema), validToken, publishPost)
postsRouter.post("/posts/like", validToken, likePost)
postsRouter.post("/posts/checklike", validToken, checkPostLikes )

export default postsRouter;