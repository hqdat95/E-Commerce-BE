import Joi from 'joi';
import { GrantType } from '../constants';
import { BadRequest, UnprocessableEntity } from '../core/error.response';

export default (schema) => {
  return (req, res, next) => {
    try {
      const { grantType } = req.body;

      if (grantType) {
        if (!Object.values(GrantType).includes(grantType)) {
          return next(new BadRequest('Invalid grant type'));
        }

        const schemaFunc = schema[grantType];

        if (typeof schemaFunc.validate !== 'function') {
          return next(new UnprocessableEntity('Schema does not have a validate method'));
        }

        const { error } = schemaFunc.validate(req.body);

        if (error) {
          return next(new BadRequest(error.details[0].message));
        }

        return next();
      }

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
