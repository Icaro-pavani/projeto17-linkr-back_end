import { Router } from "express";

import { publishPost } from "../controllers/publishController.js";
import validSchema from "../middlewares/validSchemas.js";
import publishingSchema from "../schemas/publishingSchema.js";
import validToken from "../middlewares/validToken.js"

const publishRouter = Router();

publishRouter.post("/user/publish", validSchema(publishingSchema), validToken, publishPost); //validToken esperando jwt ser recebido no login

export default publishRouter;