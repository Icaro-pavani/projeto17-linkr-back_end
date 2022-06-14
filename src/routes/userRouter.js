import { Router } from "express";

import { signUp } from "../controllers/authController.js";
import validSchema from "../middlewares/validSchemas.js";
import signUpSchema from "../schemas/signUpSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validSchema(signUpSchema), signUp);

export default userRouter;
