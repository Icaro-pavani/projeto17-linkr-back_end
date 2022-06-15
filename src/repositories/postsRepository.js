import db from "./../db.js";

async function getAllPosts(){
    const limit = 20;
    return db.query(`SELECT * FROM posts ORDER BY id DESC`);    
};

const postsRepository = {
    getAllPosts
};

export default postsRepository;