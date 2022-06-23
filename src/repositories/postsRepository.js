import db from "./../db.js";

async function getAllPosts() {
  const limit = 20;
  const query = `
        SELECT posts.*, users.username AS username, users.picture AS picture
        FROM posts 
        JOIN users ON users.id = posts."idUser"
        ORDER BY posts.id DESC
    `;
  return db.query(query);
}

async function getFollowedPosts(idUser) {
  const limit = 10;
  const query = `
        SELECT p.*, u.username AS username, u.picture AS picture 
        FROM follows f
        RIGHT JOIN posts p ON p."idUser" = f.following
        JOIN users u ON u.id = p."idUser"
        WHERE f."idUser" = $1
        ORDER BY p.id DESC
        LIMIT 10
    `;
  return db.query(query, [parseInt(idUser)]);
}

async function filterPostsByHashtag(hashtagName) {
  const query = `
        SELECT posts.*, users.username AS username, users.picture AS picture
        FROM posts 
        JOIN "hashtagsPosts" ON "hashtagsPosts"."idPost" = posts.id
        JOIN hashtags ON hashtags.id = "hashtagsPosts"."idHashtag"
        JOIN users ON users.id = posts."idUser"
        WHERE hashtags.name = $1;
    `;
  return db.query(query, [hashtagName]);
}

async function filterPostsByUser(id) {
  const query = `
        SELECT posts.*, users.username AS username, users.picture AS picture
        FROM posts 
        JOIN users ON users.id = posts."idUser"
        WHERE users.id = $1
        ORDER BY posts.id DESC
    `;
  return db.query(query, [id]);
}

async function insertPost(
  idUser,
  link,
  description,
  titleLink,
  imageLink,
  linkDescription
) {
  return db.query(
    `INSERT INTO posts ("idUser", description, link, "titleLink", "imageLink", "descriptionLink") 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING posts.id`,
    [idUser, description, link, titleLink, imageLink, linkDescription]
  );
}

async function toggleLikePost(idUser, idPost) {
  const check = await checkLike(idUser, idPost);
  if (check.rowCount === 0) {
    return db.query(
      `INSERT INTO "likesPosts" ("idUser","idPost") VALUES ($1, $2)`,
      [idUser, idPost]
    );
  } else {
    return db.query(
      `DELETE FROM "likesPosts" WHERE "idUser"=$1 AND "idPost"=$2`,
      [idUser, idPost]
    );
  }
}

async function checkLike(idUser, idPost) {
  return db.query(
    `SELECT * FROM "likesPosts" WHERE "idUser"=$1 AND "idPost"=$2`,
    [idUser, idPost]
  );
}

async function countLikes(idPost) {
  return db.query(`SELECT COUNT(*) FROM "likesPosts" WHERE "idPost"=$1`, [
    idPost,
  ]);
}

async function deletePost(id) {
  await db.query(`DELETE FROM "hashtagsPosts" WHERE "idPost" = $1`, [id]);
  await db.query(`DELETE FROM "likesPosts" WHERE "idPost" = $1`, [id]);

  return db.query(`DELETE FROM posts WHERE id=($1)`, [id]);
}

async function findPost(id) {
  return db.query(`SELECT * FROM posts WHERE id=($1)`, [id]);
}

async function updateDescription(id, description) {
  return db.query(`UPDATE posts SET description=$1 WHERE id=$2`, [
    description,
    id,
  ]);
}

async function lastUserLikes(id, idUser) {
<<<<<<< HEAD
    return db.query(
        `SELECT DISTINCT u.username FROM "likesPosts" AS lp
        JOIN users AS u ON lp."idUser"=u.id
        WHERE lp."idPost"=$1 AND u.id<>$2
        LIMIT 2`, [id, idUser]
    );
=======
  return db.query(
    `SELECT DISTINCT u.username FROM "likesPosts" AS lp
        JOIN users AS u ON lp."idUser"=u.id
        WHERE lp."idPost"=$1 AND u.id<>$2
        LIMIT 2`,
    [id, idUser]
  );
>>>>>>> main
}

async function searchUsers(username) {
  return db.query(
    `SELECT users.id, users.username, users.picture FROM users WHERE username LIKE '%' || $1 || '%'`,
    [username]
  );
}

async function insertComment(idUser,idPost,comment) {
    return db.query(
        `INSERT INTO comments ("idUser","idPost",comment,"createdAt") VALUES ($1, $2,$3,DEFAULT)`,[idUser,idPost,comment]
    );
}

async function getComments(idUser) {
    return db.query(
<<<<<<< HEAD
        `SELECT users.id, users.username, users.picture FROM users WHERE username LIKE '%' || $1 || '%'`, [username]
=======
        `SELECT users.username,users.picture,comments.* FROM comments JOIN users ON "idUser"=users.id WHERE "idPost"=$1`,[idUser]
>>>>>>> main
    );
};

async function countShares(idPost) {
    return db.query(
        `SELECT COUNT(*) FROM posts WHERE "idPost"=$1`,
        [idPost]);
};

async function shareExist(idUser, idPost) {
    return db.query(
        `SELECT COUNT(*) FROM posts WHERE "idUser"=$1 AND "idPost"=$2`,
        [idUser, idPost]);
}

<<<<<<< HEAD
async function sharePost(idUser, post) {
    return db.query(
        `INSERT INTO posts ("idUser", "idPost", description, link, "titleLink", "imageLink", "descriptionLink") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [idUser, post.id, post.description, post.link, post.titleLink, post.imageLink, post.descriptionLink]);
=======
async function countComments(idPost) {
    return db.query(
        `SELECT COUNT(*) FROM "comments" WHERE "idPost"=$1`,
    [idPost]);
>>>>>>> main
};

const postsRepository = {
    getAllPosts,
    getFollowedPosts,
    filterPostsByHashtag,
    filterPostsByUser,
    insertPost,
    toggleLikePost,
    checkLike,
    countLikes,
    insertPost,
    deletePost,
    findPost,
    updateDescription,
    lastUserLikes,
    searchUsers,
<<<<<<< HEAD
    countShares,
    sharePost,
    shareExist
=======
    insertComment,
    getComments,
    countComments
>>>>>>> main
};

export default postsRepository;
