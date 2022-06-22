import { Router } from "express";

import userRouter from "./userRouter.js";
import postsRouter from "./postsRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import followRouter from "./followRouter.js";

const router = Router();

router.use(userRouter);
router.use(postsRouter);
router.use(hashtagsRouter);
router.use(followRouter);

export default router;
