import db from '../models';
import bcrypt from 'bcryptjs';
import redis from '../redis/connect.redis';
import config from '../configs/auth.config';
import * as googleSvc from './google.service';
import { Token as constant } from '../constants';
import handleGoogleLogin from '../utils/google.util';
import { generateTokens, signToken } from '../utils/token.util';
import { Unauthorized, BadRequest } from '../core/error.response';

export const register = async ({ username, email, password }) => {
  const isExist = await db.User.count({ where: { email }, paranoid: false });

  if (isExist > 0) throw new Unauthorized('User already exists');

  const user = await db.User.create({ username, email, password });

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

export const localLogin = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throw new BadRequest('Invalid Credentials');

  if (user.isGoogleLogin && !user.password) {
    return await handleGoogleLogin(user);
  }

  const isPwdMatch = await bcrypt.compareSync(password, user.password);

  if (!isPwdMatch) throw new BadRequest('Invalid Credentials');

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

export const googleLogin = async (code) => {
  const authorizationCode = decodeURIComponent(code);

  const userInfo = await googleSvc.infoGoogleOAuth(authorizationCode);

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

export const refreshToken = async (user) => {
  await redis.del(`${constant.ACCESS_TOKEN}:${user.id}`);

  const accessToken = await signToken(
    user,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRES_IN,
    constant.ACCESS_TOKEN,
  );

  return { accessToken };
};

export const logout = async (user) => {
  await Promise.all([
    redis.del(`${constant.ACCESS_TOKEN}:${user.id}`),
    redis.del(`${constant.REFRESH_TOKEN}:${user.id}`),
  ]);

  return { message: 'Logged out successfully', user };
};
