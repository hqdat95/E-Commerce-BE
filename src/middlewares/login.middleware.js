import db from '../models';
import jwt from 'jsonwebtoken';
import { Unauthorized, NotFound } from '../core/error.response';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.decode(token);

    if (!decoded) return next(new Unauthorized('Decoding failed'));

    const user = await db.User.findByPk(decoded.id);

    if (!user) return next(new NotFound('User not found'));

    req.userId = user.id;

    next();
  } catch (err) {
    return next();
  }
};
