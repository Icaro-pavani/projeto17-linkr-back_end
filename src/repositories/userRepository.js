import db from "../db.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function signUpUser(email, password, username, picture) {
  return db.query(
    `INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)`,
    [email, password, username, picture]
  );
}

const userRepository = { getUserByEmail, signUpUser };

export default userRepository;
