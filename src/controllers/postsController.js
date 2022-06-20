import urlMetadata from "url-metadata";
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

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  console.log(req.params);
  try {
    const filteredPosts = await postsRepository.filterPostsByHashtag(hashtag);
    //console.log(filteredPosts);

    const limit = 20;
    if (filteredPosts.rowCount === 0) {
      res.sendStatus(204);
      return;
    }
    else if (filteredPosts.rowCount <= limit) {
      res.status(200).send(filteredPosts.rows);
      return;
    }

    //const { page } = req.query;
    //const start = (page - 1) * limit;
    //const end = page * limit;

    const start = 0;
    const end = limit;

    res.status(200).send(filteredPosts.rows.splice(start, end));

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPostsByUser(req, res) {
  const { id } = req.params;

  try {
    const userPosts = await postsRepository.filterPostsByUser(id);

    const limit = 20;
    if (userPosts.rowCount === 0) {
      res.sendStatus(204);
      return;
    }
    else if (userPosts.rowCount <= limit) {
      res.status(200).send(userPosts.rows);
      return;
    }

    //const { page } = req.query;
    //const start = (page - 1) * limit;
    //const end = page * limit;

    const start = 0;
    const end = limit;

    res.status(200).send(userPosts.rows.splice(start, end));

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export async function publishPost(req, res, next) {
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

  next();
};

export async function editPost(req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const post = await postsRepository.findPost(id);
    if (post.rowCount === 0) {
      return res.sendStatus(404);
    }

    await postsRepository.updateDescription(id, description);
    return res.sendStatus(204);

  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  };
};

export async function likePost(req, res) {
  try {
    const { idPost } = req.body;
    const user = res.locals.user;
    await postsRepository.toggleLikePost(user.id, idPost)
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  };
}

export async function checkPostLikes(req, res) {
  const { idPost } = req.body;
  const user = res.locals.user;
  const checkForLikes = await postsRepository.checkLike(user.id, idPost);

  if (checkForLikes.rowCount === 0) {
    return res.status(200).send(false);
  } else {
    return res.status(200).send(true);
  };
}

export async function countLikes(req, res) {  
  try {
    const { id } = req.params;
    const count = await postsRepository.countLikes(id);
    return res.status(200).send(count.rows[0].count);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  };
}