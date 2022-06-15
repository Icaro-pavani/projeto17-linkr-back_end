import { Router } from "express";

import publishRouter from "./publishingRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(publishRouter);

export default router;
