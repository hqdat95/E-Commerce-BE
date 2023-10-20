import Joi from 'joi';
import { Roles } from '../constants';

export default () => {
  return {
    username: Joi.string().min(6).required().label('Username').messages({
      'string.base': 'Username should be a string',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must have at least 6 characters',
      'any.required': 'Username is required',
    }),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .label('Email')
      .messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
      }),

    password: Joi.string()
      .required()
      .pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      .label('Password')
      .messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be empty',
        'string.pattern.base':
          'Password must have at least 6 characters, one letter, one number, and one special character',
        'any.required': 'Password is required',
      }),

    role: Joi.string()
      .valid(...Object.values(Roles))
      .default(Roles.CUSTOMER)
      .optional()
      .label('Role')
      .messages({
        'string.base': 'Role should be a string',
        'string.empty': 'Role cannot be empty',
        'any.only': 'Invalid role value',
      }),
  };
};
