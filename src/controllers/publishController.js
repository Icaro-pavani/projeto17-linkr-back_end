import userRepository from "../repositories/userRepository.js";

export async function publishPost(req, res) {
    try {
        const user = res.locals.user;
        const { idUser, link, description } = res.locals.body;

        if (user.id === post.id) {
            await userRepository.insertPost(idUser, link, description);
            res.sendStatus(201);
        };    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};