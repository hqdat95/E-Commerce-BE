import Joi from 'joi';
import userSchema from './user.validator';

export default {
  forgot: () => {
    return { email: userSchema().email };
  },

  update: () => {
    return {
      otp: Joi.number().integer().min(0).max(999999).required().label('OTP').messages({
        'number.base': 'OTP should be a number',
        'number.integer': 'OTP should be an integer',
        'number.min': 'OTP must be between 000000 and 999999',
        'number.max': 'OTP must be between 000000 and 999999',
        'any.required': 'OTP is required',
      }),

      newPassword: userSchema().password,
    };
  },

  change: () => {
    return {
      oldPassword: userSchema().password,
      newPassword: userSchema().password,
    };
  },
};
