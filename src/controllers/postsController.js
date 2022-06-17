import postsRepository from "./../repositories/postsRepository.js";

export async function getPosts(req, res) {
    try {
        const allPosts = await postsRepository.getAllPosts();

        const limit = 20;
        if (allPosts.rowCount === 0) {
            res.sendStatus(204);
            return;
        }
        else if (allPosts.rowCount <= limit) {
            res.status(200).send(allPosts.rows);
            return;
        }

        //const { page } = req.query;
        //const start = (page - 1) * limit;
        //const end = page * limit;

        const start = 0;
        const end = limit;

        res.status(200).send(allPosts.rows.splice(start, end));

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function publishPost(req, res) {
    try {
        const user = res.locals.user;
        const { link, description } = res.locals.body;

        await postsRepository.insertPost(user.id, link, description);
        return res.sendStatus(201);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    };
};

export async function deletePost(req, res) {
    try {
        const { id } = req.params;

        const post = await postsRepository.findPost(id);
        if (post.rowCount === 0) {
            return res.sendStatus(404);
        }

        await postsRepository.deletePost(id);
        return res.sendStatus(204);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    };
}