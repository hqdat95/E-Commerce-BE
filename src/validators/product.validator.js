import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().required().label('Name').messages({
      'any.required': 'Name is a required field.',
      'string.empty': 'Name must not be empty.',
    }),

    description: Joi.string().allow('').optional().label('Description').messages({
      'string.empty': 'Description must not be empty.',
    }),

    price: Joi.number().precision(2).greater(0).required().label('Price').messages({
      'any.required': 'Price is a required field.',
      'number.base': 'Price must be a number.',
      'number.precision': 'Price can have a maximum of 2 decimal places.',
      'number.greater': 'Price must be greater than 0.',
    }),

    quantity: Joi.number().integer().min(0).required().label('Quantity').messages({
      'any.required': 'Quantity is a required field.',
      'number.base': 'Quantity must be an integer.',
      'number.min': 'Quantity must be greater than or equal to 0.',
    }),

    categoryId: Joi.string().guid({ version: 'uuidv4' }).optional().label('Category ID').messages({
      'string.guid': 'Category ID must be in UUID format.',
    }),
  };
};
