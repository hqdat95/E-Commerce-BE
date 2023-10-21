import db from '../models';
import redis from '../redis/connect.redis';
import { Unauthorized, NotFound } from '../core/error.response';

export default async (req, res, next) => {
  const { id } = req.params;
  const { otp } = req.body;

  try {
    const redisOTP = await redis.get(`OTP:${id}`);

    if (otp !== redisOTP) throw new Unauthorized('Invalid OTP');

    const user = await db.User.findByPk(id);

    if (!user) throw new NotFound('User not found');

    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};
