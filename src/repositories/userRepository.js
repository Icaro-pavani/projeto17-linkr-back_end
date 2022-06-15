import db from "../db.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUSerByUsername(username) {
  return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
}

async function signUpUser(email, password, username, picture) {
  return db.query(
    `INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)`,
    [email, password, username, picture]
  );
}

const userRepository = { getUserByEmail, signUpUser, getUSerByUsername };

export default userRepository;
