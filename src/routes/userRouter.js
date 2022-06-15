import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchemas.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validSchema(signUpSchema), signUp);

userRouter.post("/sign-in", validSchema(signInSchema), signIn);

export default userRouter;
