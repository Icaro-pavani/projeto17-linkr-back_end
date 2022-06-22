import db from "../db.js";

async function insertFollow(idUser, idFollowed) {
  return db.query(`INSERT INTO follows ("idUser", following) VALUES ($1, $2)`, [
    parseInt(idUser),
    parseInt(idFollowed),
  ]);
}

async function deleteFollow(idUser, idFollowed) {
  return db.query(
    `DELETE FROM follows WHERE "idUser" = $1 AND following = $2`,
    [parseInt(idUser), parseInt(idFollowed)]
  );
}

async function getFollow(idUser, idFollowed) {
  return db.query(
    `SELECT * FROM follows WHERE "idUser" = $1 AND following = $2`,
    [parseInt(idUser), parseInt(idFollowed)]
  );
}

const followsRepository = { insertFollow, deleteFollow, getFollow };

export default followsRepository;
