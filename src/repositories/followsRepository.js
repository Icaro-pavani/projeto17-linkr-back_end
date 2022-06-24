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

async function getAllFollowed(idUser) {
  return db.query(`SELECT * FROM follows WHERE "idUser"= $1`, [
    parseInt(idUser),
  ]);
}

async function getAllFollowedArray(idUser) {
  return db.query(`SELECT ARRAY (SELECT following FROM follows WHERE "idUser"=$1)`, [
    parseInt(idUser)
  ]);
}

const followsRepository = {
  insertFollow,
  deleteFollow,
  getFollow,
  getAllFollowed,
  getAllFollowedArray
};

export default followsRepository;
