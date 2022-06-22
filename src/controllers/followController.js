import followsRepository from "../repositories/followsRepository.js";

export async function followUser(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    await followsRepository.insertFollow(user.id, id);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function unfollowUser(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    await followsRepository.deleteFollow(user.id, id);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function checkFollow(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    const follow = await followsRepository.getFollow(user.id, id);

    res.status(200).send(follow.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
