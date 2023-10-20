import db from '../models';
import { Unauthorized } from '../core/error.response';

export const registerSvc = async ({ username, email, password }) => {
  const isExist = await db.User.count({ where: { email }, paranoid: false });

  if (isExist > 0) throw new Unauthorized('User already exists');

  const user = await db.User.create({ username, email, password });

  return { user };
};
