import userRepository from "../repositories/userRepository.js";

export async function publishPost(req, res) {
    try {
        const user = res.locals.user;
        const { username, link, description } = res.locals.body;

        if (user.username === username) {
            await userRepository.insertPost(user.id, link, description);
            return res.sendStatus(201);
        };    
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};