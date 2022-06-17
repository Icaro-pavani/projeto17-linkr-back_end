import { Router } from "express";
import { getPosts, publishPost, deletePost } from "../controllers/postsController.js";
import validSchema from "../middlewares/validSchemas.js";
import publishingSchema from "../schemas/publishingSchema.js";
import validToken from "../middlewares/validToken.js"

const postsRouter = Router();

postsRouter.get("/posts", getPosts);
postsRouter.post("/posts", validSchema(publishingSchema), validToken, publishPost)
postsRouter.delete("/posts/:id", validToken, deletePost);

export default postsRouter;