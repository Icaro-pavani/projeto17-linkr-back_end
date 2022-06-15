import Joi from "joi";

const publishingSchema = Joi.object({
  username: Joi.string().required(),
  link: Joi.string().uri().required(),
  description: Joi.string().max(500)
});

export default publishingSchema;