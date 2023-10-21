import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().min(2).required().label('Name').messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least {#limit} characters long',
      'any.required': 'Name is required',
    }),

    parentId: Joi.string().guid({ version: 'uuidv4' }).allow(null).label('Parent ID').messages({
      'string.guid': 'Parent ID must be a valid UUIDv4',
    }),
  };
};
