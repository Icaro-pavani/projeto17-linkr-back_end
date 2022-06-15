import { Router } from "express";

import userRouter from "./userRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

router.use(userRouter);
router.use(postsRouter);

export default router;
