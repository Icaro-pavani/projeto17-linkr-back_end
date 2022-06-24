import db from "../db.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUserByUsername(username) {
  return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
}

async function signUpUser(email, password, username, picture) {
  return db.query(
    `INSERT INTO users (email, password, username, picture) VALUES ($1, $2, $3, $4)`,
    [email, password, username, picture]
  );
}

async function userById(id) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [parseInt(id)]);
}

async function searchUsers(idUser, username) {
  return db.query(
    `SELECT users.id, users.username, users.picture, f."idUser" as follow
    FROM users 
    LEFT JOIN (SELECT * FROM follows WHERE "idUser" = $1) f
    ON f.following = users.id
    WHERE username LIKE '%' || $2 || '%'
    ORDER BY follow`,
    [parseInt(idUser), username]
  );
}

const userRepository = {
  getUserByEmail,
  signUpUser,
  getUserByUsername,
  userById,
  searchUsers,
};

export default userRepository;
