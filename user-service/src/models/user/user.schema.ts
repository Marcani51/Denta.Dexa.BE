import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  createdDate: Joi.date(),
  updateDate: Joi.date(),
  createdBy: Joi.string().required(),
  updateBy: Joi.string().required(),
  isActive: Joi.boolean().required(),
  detail: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(8).required(),
    gender: Joi.string().valid("MALE", "FEMALE").required(),
    address: Joi.string().required(),
    position: Joi.string().required(),
    createdDate: Joi.date(),
    updateDate: Joi.date(),
    createdBy: Joi.string().required(),
    updateBy: Joi.string().required()
  }).required()
});
