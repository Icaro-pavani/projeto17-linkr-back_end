import userRepository from "../repositories/userRepository.js";

export async function signUp(req, res) {
  try {
    const { email, password, username, picture } = res.locals.body;
    const userResult = await userRepository.getUserByEmail(email);
    if (userResult.rowCount !== 0) {
      return res.status(409).send("E-mail already in use!");
    }

    const usernameResult = await userRepository.getUSerByUsername(username);
    if (usernameResult.rowCount !== 0) {
      return res.status(409).send("Username already in use!");
    }

    await userRepository.signUpUser(email, password, username, picture);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
