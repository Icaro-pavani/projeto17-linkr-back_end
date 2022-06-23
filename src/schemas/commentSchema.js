import Joi from "joi";

const commentSchema = Joi.object({
  idPost: Joi.number().integer().required(),
  comment: Joi.string().max(300).allow('')
});

export default commentSchema;