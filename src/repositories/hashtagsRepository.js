import db from "./../db.js";

async function insertHashtag(name) {
    return db.query(
        `WITH e AS (
            INSERT INTO hashtags (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING hashtags.id
        )
        SELECT * FROM e
        UNION
            SELECT id FROM hashtags WHERE name = $1`,
        [name]
    );
};

async function insertRelation(hashId, postId){
    return db.query(
        `INSERT INTO "hashtagsPosts" ("idHashtag", "idPost")
        VALUES ($1, $2)`,
        [parseInt(hashId), parseInt(postId)]
    );
}

const hashtagsRepository = {
    insertHashtag,
    insertRelation
};

export default hashtagsRepository;