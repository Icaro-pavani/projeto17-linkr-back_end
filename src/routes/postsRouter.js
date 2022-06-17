import { Router } from "express";
import { publishPost, getPostsByHashtag, checkPostLikes, countLikes, getPosts, likePost } from "../controllers/postsController.js";
import { saveHashtags, saveRelations } from "./../controllers/hashtagsController.js";
import validSchema from "../middlewares/validSchemas.js";
import publishingSchema from "../schemas/publishingSchema.js";
import validToken from "../middlewares/validToken.js";

const postsRouter = Router();

postsRouter.get("/posts", getPosts);
postsRouter.get("/posts/:hashtag", getPostsByHashtag);
postsRouter.post("/posts", validSchema(publishingSchema), validToken, publishPost, saveHashtags, saveRelations);
postsRouter.post("/posts/like", validToken, likePost);
postsRouter.post("/posts/checklike", validToken, checkPostLikes);
postsRouter.post("/posts/likecount", countLikes);

export default postsRouter;