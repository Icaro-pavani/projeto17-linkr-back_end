import hashtagsRepository from "../repositories/hashtagsRepository.js";

export async function saveHashtags(req, res, next) {
    try {
      const postDescription = res.locals.postDescription;
      
      const hashtagsArray = postDescription.split(' ').filter(w => w.startsWith('#'));
      
      let hashtagsIds = [];
      for (let h of hashtagsArray){
        h = h.slice(1);

        const result = await hashtagsRepository.insertHashtag(h);

        if (result.rowCount > 0){
            const hashId = result.rows[0].id;
            hashtagsIds.push(hashId);
        }
      }
      
      res.locals.hashtagsIds = hashtagsIds;

    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    };

    next();
};

export async function saveRelations(req, res) {
    try {
      const hashtagsIdsArray = res.locals.hashtagsIds;
      const postId = res.locals.postId;

      for (let hashId of hashtagsIdsArray){
        await hashtagsRepository.insertRelation(hashId, postId);
      }
      
      res.sendStatus(201);

    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    };
};

export async function getTrendingHashtags(req, res){
  try {
    const result = await hashtagsRepository.selectTrendingHashtags();
    
    const trending = result.rows;
    
    res.status(200).send(trending);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  };
}