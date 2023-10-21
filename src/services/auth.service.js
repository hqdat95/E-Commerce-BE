import bcrypt from 'bcryptjs';
import db from '../models';
import { infoGoogleOAuth } from './google.service';
import { Unauthorized, BadRequest } from '../core/error.response';

export const registerSvc = async ({ username, email, password }) => {
  const isExist = await db.User.count({ where: { email }, paranoid: false });

  if (isExist > 0) throw new Unauthorized('User already exists');

  const user = await db.User.create({ username, email, password });

  return { user };
};

export const localLoginSvc = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throw new BadRequest('Invalid Credentials');

  const isPwdMatch = await bcrypt.compareSync(password, user.password);

  if (!isPwdMatch) throw new BadRequest('Invalid Credentials');

  return { user };
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

  return { user };
};
