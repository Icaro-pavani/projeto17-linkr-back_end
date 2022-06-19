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
};

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
};

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

async function insertPost(idUser, link, description, titleLink, imageLink, linkDescription) {
    return db.query(
        `INSERT INTO posts ("idUser", description, link, "titleLink", "imageLink", "descriptionLink") 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING posts.id`,
        [idUser, description, link, titleLink, imageLink, linkDescription]);
};

async function toggleLikePost(idUser, idPost) {
    const check = await checkLike(idUser, idPost);
    if (check.rowCount === 0) {
        return db.query(
            `INSERT INTO "likesPosts" ("idUser","idPost") VALUES ($1, $2)`,
            [idUser, idPost]);
    } else {
        return db.query(
            `DELETE FROM "likesPosts" WHERE "idUser"=$1 AND "idPost"=$2`,
            [idUser, idPost]);
    };
};

async function checkLike(idUser, idPost) {
    return db.query(
        `SELECT * FROM "likesPosts" WHERE "idUser"=$1 AND "idPost"=$2`,
        [idUser, idPost]);
};

async function countLikes(idPost) {
    return db.query(
        `SELECT COUNT(*) FROM "likesPosts" WHERE "idPost"=$1`,
        [idPost]);
};

async function deletePost(id) {
    await db.query(`DELETE FROM "hashtagsPosts" WHERE "idPost" = $1`, [id]);
    await db.query(`DELETE FROM "likesPosts" WHERE "idPost" = $1`, [id]);

    return db.query(
        `DELETE FROM posts WHERE id=($1)`, [id]
    );
};

async function findPost(id) {
    return db.query(
        `SELECT FROM posts WHERE id=($1)`, [id]
    );
};

async function updateDescription(id, description) {
    return db.query(`UPDATE posts SET description=$1 WHERE id=$2`, [description, id]);
}

const postsRepository = {
    getAllPosts,
    filterPostsByHashtag,
    filterPostsByUser,
    insertPost,
    toggleLikePost,
    checkLike,
    countLikes,
    insertPost,
    deletePost,
    findPost,
    updateDescription
};

export default postsRepository;