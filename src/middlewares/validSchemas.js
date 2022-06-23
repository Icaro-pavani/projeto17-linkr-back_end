import { stripHtml } from "string-strip-html";

export default function validSchema(schema) {
  return async (req, res, next) => {
    try {
      const schemaBody = {};
      for (const key in req.body) {
        if(typeof schemaBody[key] === "string"){
          schemaBody[key] = stripHtml(req.body[key]).result.trim();
        } else {
          schemaBody[key] = req.body[key];
        }
      }
      const validation = await schema.validateAsync(schemaBody, {
        abortEarly: false,
      });

      res.locals.body = validation;
    } catch (error) {
      console.log(error);
      return res.status(422).send(error.message);
    }

    next();
  };
}
