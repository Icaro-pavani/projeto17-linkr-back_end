import Joi from "joi";

const signUpSchema = Joi.object({
  email: Joi.string().email().max(40).required(),
  password: Joi.string().required(),
  username: Joi.string().max(30).required(),
  picture: Joi.string().uri().required(),
});

export default signUpSchema;
