import Joi from "joi";

export const roleValidationSchema = Joi.object({
  roleName: Joi.string().min(3).max(50).required(),
  isActive: Joi.boolean().required(),
  createdDate: Joi.date().optional().allow(null),
  updateDate: Joi.date().optional().allow(null),
  createdBy: Joi.string().required(),
  updateBy: Joi.string().required(),
  access: Joi.object({
    view: Joi.boolean().required(),
    edit: Joi.boolean().required(),
    absent:Joi.boolean().required(),
    roleId: Joi.string().optional()
  }).optional()
});