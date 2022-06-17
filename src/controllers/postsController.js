import urlMetadata from "url-metadata";
import postsRepository from "./../repositories/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const allPosts = await postsRepository.getAllPosts();
    
    const limit = 20;
    if (allPosts.rowCount === 0){
      res.sendStatus(204);
      return;
    }
    else if (allPosts.rowCount <= limit){
      res.status(200).send(allPosts.rows);
      return;
    }

    //const { page } = req.query;
    //const start = (page - 1) * limit;
    //const end = page * limit;

    const start = 0;
    const end = limit;
  
    res.status(200).send(allPosts.rows.splice(start,end));

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
    if (filteredPosts.rowCount === 0){
      res.sendStatus(204);
      return;
    }
    else if (filteredPosts.rowCount <= limit){
      res.status(200).send(filteredPosts.rows);
      return;
    }

    //const { page } = req.query;
    //const start = (page - 1) * limit;
    //const end = page * limit;

    const start = 0;
    const end = limit;
  
    res.status(200).send(filteredPosts.rows.splice(start,end));

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function publishPost(req, res, next) {
    try {
      const user = res.locals.user;
      const { link, description } = req.body;

      const metadata = await urlMetadata(link);
      const { title : titleLink , image : imageLink, description : linkDescription} = metadata;

      const result = await postsRepository.insertPost(user.id, link, description, titleLink, imageLink, linkDescription);

      const postId = result.rows[0].id;

      res.locals.postId = postId;
      res.locals.postDescription = description;

    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    };

    next();
};

export async function likePost(req, res) {
  try {
    const { idPost } = req.body;
    const user = res.locals.user;
    await postsRepository.toggleLikePost(user.id,idPost)
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  };
}

export async function checkPostLikes(req, res) {
  const { idPost } = req.body;
  const user = res.locals.user;
  const checkForLikes = await postsRepository.checkLike(user.id,idPost);

  if ( checkForLikes.rowCount===0 ) {
    return res.status(200).send(false);
  } else {
    return res.status(200).send(true);
  };
}

export async function countLikes(req, res) {
  try {
    const { idPost } = req.body;
    const count = await postsRepository.countLikes(idPost);  
    return res.status(200).send(count.rows[0].count);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  };
}