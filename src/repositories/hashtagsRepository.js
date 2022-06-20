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

async function selectTrendingHashtags() {
    return db.query(
        `SELECT hashtags.name AS name, COUNT("hashtagsPosts".id) AS trend
        FROM hashtags
        JOIN "hashtagsPosts" ON "hashtagsPosts"."idHashtag" = hashtags.id
        GROUP BY "hashtags".name
        ORDER BY trend DESC
        LIMIT 10`
    );
}

const hashtagsRepository = {
    insertHashtag,
    insertRelation,
    selectTrendingHashtags
};

export default hashtagsRepository;