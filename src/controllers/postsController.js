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

export async function publishPost(req, res) {
    try {
      const user = res.locals.user;
      const { link, description } = req.body;

      const metadata = await urlMetadata(link);
      const { title : titleLink , image : imageLink, description : linkDescription} = metadata;

      await postsRepository.insertPost(user.id, link, description, titleLink, imageLink, linkDescription);

      return res.sendStatus(201);

    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    };
};
