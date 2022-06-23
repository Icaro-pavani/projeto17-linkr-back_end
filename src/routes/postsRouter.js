import { Router } from "express";
import { getPosts, publishPost, deletePost, getPostsByHashtag, checkPostLikes, countLikes, likePost, editPost, addComment, getComments, countComments } from "../controllers/postsController.js";
import { saveHashtags, saveRelations } from "./../controllers/hashtagsController.js";
import validSchema from "../middlewares/validSchemas.js";
import publishingSchema from "../schemas/publishingSchema.js";
import validToken from "../middlewares/validToken.js";
import commentSchema from "../schemas/commentSchema.js";

const postsRouter = Router();

postsRouter.get("/posts", validToken, getPosts);
postsRouter.get("/posts/:hashtag", validToken, getPostsByHashtag);
postsRouter.post("/posts", validSchema(publishingSchema), validToken, publishPost, saveHashtags, saveRelations);
postsRouter.post("/posts/like", validToken, likePost);
postsRouter.post("/posts/checklike", validToken, checkPostLikes);
postsRouter.get("/posts/likecount/:id", validToken, countLikes);
postsRouter.delete("/posts/:id", validToken, deletePost);
postsRouter.post("/posts/:id/edit", validToken, editPost);
postsRouter.post("/posts/comment", validToken, validSchema(commentSchema), addComment); 
postsRouter.get("/posts/comment/:id", validToken, getComments);
postsRouter.get("/posts/commentcount/:id", validToken, countComments); 

export default postsRouter;