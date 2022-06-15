import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import userRepository from "../repositories/userRepository.js";
import tokenSchema from "../schemas/tokenSchema.js";

dotenv.config();

export default async function validToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const tokenValidation = await tokenSchema.validateAsync(token);

    const secretKey = process.env.JWT_KEY;

    const user = jwt.verify(tokenValidation, secretKey);

    const userResult = await userRepository.getUserByUsername(user.username);
    
    if (userResult.rows.length === 0) {
      return res.sendStatus(404);
    }

    delete user.iat;
    res.locals.user = userResult.rows[0];
  } catch (error) {
    console.log(error);
    console.log(req.headers.authorization)
    return res.sendStatus(401);
  }

  next();
}
