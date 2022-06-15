import db from "./../db.js";

async function getAllPosts(){
    const limit = 20;
    return db.query(`SELECT * FROM posts ORDER BY id DESC`);    
};

async function insertPost(idUser, link, description) {
    return db.query(
      `INSERT INTO posts ("idUser", link, description) VALUES ($1, $2, $3)`,
      [idUser, link, description]
    );
};

const postsRepository = {
    getAllPosts,
    insertPost
};

export default postsRepository;