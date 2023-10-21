import jwt from 'jsonwebtoken';
import db from '../models';
import redis from '../redis/connect.redis';
import config from '../configs/auth.config';
import { Token as constant } from '../constants';
import { Unauthorized, NotFound } from '../core/error.response';

export default async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new Unauthorized(`No access token provided`));
  }

  try {
    const decoded = jwt.decode(token);

    if (!decoded) return next(new Unauthorized('Decoding failed'));

    const redisToken = await redis.get(`${constant.ACCESS_TOKEN}:${decoded.id}`);

    if (!redisToken || redisToken !== token) {
      return next(new Unauthorized(`Invalid or expired access token`));
    }

    const user = await db.User.findByPk(decoded.id);

    if (!user) return next(new NotFound('User not found'));

    await jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};
