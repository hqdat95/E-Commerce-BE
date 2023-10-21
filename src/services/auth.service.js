import db from '../models';
import bcrypt from 'bcryptjs';
import redis from '../redis/connect.redis';
import config from '../configs/auth.config';
import { Token as constant } from '../constants';
import { infoGoogleOAuth } from './google.service';
import { generateTokens, signToken } from '../utils/token.util';
import { Unauthorized, BadRequest } from '../core/error.response';

export const registerSvc = async ({ username, email, password }) => {
  const isExist = await db.User.count({ where: { email }, paranoid: false });

  if (isExist > 0) throw new Unauthorized('User already exists');

  const user = await db.User.create({ username, email, password });

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

export const localLoginSvc = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throw new BadRequest('Invalid Credentials');

  const isPwdMatch = await bcrypt.compareSync(password, user.password);

  if (!isPwdMatch) throw new BadRequest('Invalid Credentials');

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

export const googleLoginSvc = async (code) => {
  const authorizationCode = decodeURIComponent(code);

  const userInfo = await infoGoogleOAuth(authorizationCode);

  let user = await db.User.findOne({ where: { email: userInfo.email } });

  if (!user) {
    user = await db.User.create({
      username: userInfo.name,
      email: userInfo.email,
      isGoogleLogin: true,
    });
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

export const refreshTokenSvc = async (user) => {
  await redis.del(`${constant.ACCESS_TOKEN}:${user.id}`);

  const accessToken = await signToken(
    user,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRES_IN,
    constant.ACCESS_TOKEN,
  );

  return { accessToken };
};

export const logoutSvc = async (user) => {
  await Promise.all([
    redis.del(`${constant.ACCESS_TOKEN}:${user.id}`),
    redis.del(`${constant.REFRESH_TOKEN}:${user.id}`),
  ]);

  return { message: 'Logged out successfully', user };
};
