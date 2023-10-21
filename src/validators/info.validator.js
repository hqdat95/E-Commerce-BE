import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().required().label('Name').messages({
      'any.required': 'Name is required.',
      'string.empty': 'Name must not be empty.',
      'any.required': 'Name is required',
    }),

    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label('Phone Number')
      .messages({
        'any.required': 'Phone number is required.',
        'string.empty': 'Phone number must not be empty.',
        'string.length': 'Phone number must be exactly 10 characters long.',
        'string.pattern.base': 'Phone number can only contain numbers.',
      }),

    address: Joi.string().max(1000).required().label('Address').messages({
      'any.required': 'Address is required.',
      'string.empty': 'Address must not be empty.',
      'string.max': 'Address must not exceed 1000 characters.',
    }),

    isDefault: Joi.boolean().optional().label('Is Default'),
  };
};
