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