import Joi from 'joi';
import { BadRequest } from '../core/error.response';

export default (schema) => {
  return (req, res, next) => {
    try {
      const fields = Object.keys(req.body);
      const baseSchema = schema();

      const selectedFields = fields.reduce((obj, field) => {
        if (baseSchema[field]) {
          obj[field] = baseSchema[field];
        }
        return obj;
      }, {});

      const validation = Joi.object(selectedFields).unknown();

      const { error } = validation.validate(req.body);

      if (error) return next(new BadRequest(error.details[0].message));

      next();
    } catch (err) {
      return next(err);
    }
  };
};
