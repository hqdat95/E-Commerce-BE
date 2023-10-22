import Joi from 'joi';

export default () => {
  return {
    quantity: Joi.number().integer().greater(0).optional().label('Quantity').messages({
      'number.integer': 'Quantity must be an integer.',
      'number.base': 'Quantity must be a number.',
      'any.required': 'Quantity is required.',
      'number.greater': 'Quantity must be greater than 0.',
    }),
  };
};
