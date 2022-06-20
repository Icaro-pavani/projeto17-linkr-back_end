import { Router } from "express";

import userRouter from "./userRouter.js";
import postsRouter from "./postsRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";

const router = Router();

router.use(userRouter);
router.use(postsRouter);
router.use(hashtagsRouter);

export default router;
