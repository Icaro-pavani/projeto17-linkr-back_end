import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { userLinkRepository } from "../repositories/repository.js";
import tokenSchema from "../schemas/tokenSchema.js";

dotenv.config();

export default async function validToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const tokenValidation = await tokenSchema.validateAsync(token);

    const secretKey = process.env.JWT_KEY;

    const user = jwt.verify(tokenValidation, secretKey);

    const userResult = await userLinkRepository.getUserWithVisitCount(user.id); //tem que alterar para a função do repositório desse projeto

    if (userResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    delete user.iat;
    res.locals.user = userResult.rows[0];
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }

  next();
}
