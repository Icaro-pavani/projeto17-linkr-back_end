import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userRepository from "../repositories/userRepository.js";

dotenv.config();

export async function signUp(req, res) {
  try {
    const { email, password, username, picture } = res.locals.body;
    const userResult = await userRepository.getUserByEmail(email);
    const SALT = 10;
    if (userResult.rowCount !== 0) {
      return res.status(409).send("E-mail already in use!");
    }

    const usernameResult = await userRepository.getUserByUsername(username);
    if (usernameResult.rowCount !== 0) {
      return res.status(409).send("Username already in use!");
    }

    const passwordHash = bcrypt.hashSync(password, SALT);
    await userRepository.signUpUser(email, passwordHash, username, picture);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = res.locals.body;

    const registeredUser = await userRepository.getUserByEmail(email);

    if (registeredUser.rowCount > 0) {
      if (bcrypt.compareSync(password, registeredUser.rows[0].password)) {
        const secretKey = process.env.JWT_KEY;
        const data = {
          id: registeredUser.rows[0].id,
          username: registeredUser.rows[0].username,
        };

        const token = jwt.sign(data, secretKey);

        return res.status(200).send({ token });
      }

      return res.status(401).send("Incorrect password!");
    }

    res.status(401).send("Unregistered E-mail!");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function userByToken(req, res) {
  const { user } = res.locals;

  res.status(200).send(user);
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userRepository.userById(id);

    res.status(200).send(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
