import bcrypt from 'bcryptjs';
import db from '../models';
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
