import db from "./../db.js";

async function getAllPosts(){
    const query = `
        SELECT posts.*, users.username AS username, users.picture AS picture
        FROM posts 
        JOIN users ON users.id = posts."idUser"
        ORDER BY posts.id DESC
    `;
    return db.query(query);    
};

async function filterPostsByHashtag(hashtagName){
        
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

async function insertPost(idUser, link, description, titleLink, imageLink, linkDescription) {
    return db.query(
        `INSERT INTO posts ("idUser", description, link, "titleLink", "imageLink", "descriptionLink") 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING posts.id`,
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
    filterPostsByHashtag,
    insertPost,
    toggleLikePost,
    checkLike,
    countLikes
};

export default postsRepository;