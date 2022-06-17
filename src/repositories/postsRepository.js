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

async function insertPost(idUser, link, description) {
    return db.query(
        `INSERT INTO posts ("idUser", link, description) VALUES ($1, $2, $3)`,
        [idUser, link, description]
    );
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

const postsRepository = {
    getAllPosts,
    insertPost,
    deletePost,
    findPost
};

export default postsRepository;