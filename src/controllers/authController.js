import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";

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
