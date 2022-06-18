import { Router } from "express";

import { signIn, signUp, userByToken } from "../controllers/authController.js";
import { getPostsByUser } from "../controllers/postsController.js";
import validSchema from "../middlewares/validSchemas.js";
import validToken from "../middlewares/validToken.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validSchema(signUpSchema), signUp);
userRouter.post("/sign-in", validSchema(signInSchema), signIn);
userRouter.get("/userToken", validToken, userByToken);
userRouter.get("/user/:id", getPostsByUser);

export default userRouter;
