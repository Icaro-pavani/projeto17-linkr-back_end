import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().max(40).required(),
  password: Joi.string().required(),
});

export default signInSchema;
