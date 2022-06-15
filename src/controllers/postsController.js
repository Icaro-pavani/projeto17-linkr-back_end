import postsRepository from "./../repositories/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const allPosts = await postsRepository.getAllPosts();
    
    const limit = 20;
    if (allPosts.rowCount <= limit){
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
