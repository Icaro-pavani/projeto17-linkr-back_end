import Joi from "joi";

const tokenSchema = Joi.string().required();

export default tokenSchema;
