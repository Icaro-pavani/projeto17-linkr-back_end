import db from "./../db.js";

async function getAllPosts(){
    const limit = 20;
    const query = `
        SELECT posts.*, users.username AS username, users.picture AS picture
        FROM posts 
        JOIN users ON users.id = posts."idUser"
        ORDER BY posts.id DESC
    `;
    return db.query(query);    
};

async function insertPost(idUser, link, description, titleLink, imageLink, linkDescription) {
    return db.query(
        `INSERT INTO posts ("idUser", description, link, "titleLink", "imageLink", "descriptionLink") VALUES ($1, $2, $3, $4, $5, $6)`,
    [idUser, description, link, titleLink, imageLink, linkDescription]);
};

async function toggleLikePost(idUser, idPost) {
    const check = await checkLike(idUser,idPost);
    if(check.rowCount===0){
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

const postsRepository = {
    getAllPosts,
    insertPost,
    toggleLikePost,
    checkLike,
    countLikes
};

export default postsRepository;