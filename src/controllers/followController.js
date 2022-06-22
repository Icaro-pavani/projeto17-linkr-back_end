import followsRepository from "../repositories/followsRepository.js";

export async function followUser(req, res) {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    if (parseInt(id) === parseInt(user.id)) {
      return res.status(401).send("User and followed are the same person!");
    }

    const follow = await followsRepository.getFollow(user.id, id);

    if (!!follow) {
      return res.status(401).send("The user already follow this person!");
    }

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

export async function sendAllFollows(req, res) {
  try {
    const { user } = res.locals;

    const follows = await followsRepository.getAllFollowed(user.id);

    res.status(200).send(follows.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
