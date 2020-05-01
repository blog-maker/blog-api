import * as Joi from '@hapi/joi';

export const CreateUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
  admin: Joi.boolean().optional(),
  lockoutEnabled: Joi.boolean().optional()
});
