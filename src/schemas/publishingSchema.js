import Joi from "joi";

const publishingSchema = Joi.object({
  link: Joi.string().uri().required(),
  description: Joi.string().max(500).allow('')
});

export default publishingSchema;