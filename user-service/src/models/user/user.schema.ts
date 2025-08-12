import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  createdDate: Joi.date().optional().allow(null),
  updateDate: Joi.date().optional().allow(null),
  createdBy: Joi.string().required(),
  updateBy: Joi.string().required(),
  isActive: Joi.boolean().required(),
  roleId:Joi.string().optional().allow(null),
  detail: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid("MALE", "FEMALE").required(),
    address: Joi.string().required(),
    position: Joi.string().required(),
    createdDate: Joi.date().optional().allow(null),
    updateDate: Joi.date().optional().allow(null),
    createdBy: Joi.string().required(),
    updateBy: Joi.string().required()
  }).required()
});
