import { Router } from "express";

import publishRouter from "./publishingRouter.js";
import userRouter from "./userRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

router.use(userRouter);
router.use(publishRouter);
router.use(postsRouter);

export default router;
