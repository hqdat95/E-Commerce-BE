import jwt from 'jsonwebtoken';
import redis from '../redis/connect.redis';
import config from '../configs/auth.config';
import payload from '../helpers/payload.helper';
import { Token as constant } from '../constants';

export const signToken = async (user, secretKey, expiresIn, constant) => {
  const token = await jwt.sign(payload(user), secretKey, { expiresIn: parseInt(expiresIn) });

  await redis.set(`${constant}:${user.id}`, token, 'EX', parseInt(expiresIn));

  return token;
};

export const generateTokens = async (user) => {
  const [accessToken, refreshToken] = await Promise.all([
    signToken(user, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRES_IN, constant.ACCESS_TOKEN),

    signToken(user, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRES_IN, constant.REFRESH_TOKEN),
  ]);

  return { accessToken, refreshToken };
};
