import Joi from 'joi';
import { GrantType } from '../constants';
import userSchema from './user.validator';

export default {
  [GrantType.LOCAL_LOGIN]: Joi.object({
    grantType: Joi.string().valid(GrantType.LOCAL_LOGIN),
    email: userSchema().email,
    password: userSchema().password,
  }),

  [GrantType.GOOGLE_LOGIN]: Joi.object({
    grantType: Joi.string().valid(GrantType.GOOGLE_LOGIN),
    code: Joi.string().required().messages({
      'string.base': 'Code must be a string.',
      'string.empty': 'Code must not be empty.',
      'any.required': 'Code is required.',
    }),
  }),
};
