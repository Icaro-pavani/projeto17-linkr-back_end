import Joi from "joi";

const publishingSchema = Joi.object({
  idUser: Joi.number().integer().required(),
  link: Joi.string().uri().required(),
  description: Joi.string().max(500)
});

export default publishingSchema;