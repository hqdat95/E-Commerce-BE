import db from '../models';
import pagination from '../utils/pagination.util';
import { BadRequest, NotFound } from '../core/error.response';

export const findAll = async (paranoid = true, page) => {
  const { totalPages, limit, offset } = await pagination(db.User, paranoid, page);

  const users = await db.User.findAll({ order: [['username', 'ASC']], paranoid, limit, offset });

  return { totalPages, data: users };
};

export const findOne = async (id, paranoid = true) => {
  const user = await db.User.findOne({ where: { id }, paranoid });

  if (!user) throw new NotFound('User Not Found');

  return user;
};

export const update = async (id, username) => {
  const user = await findOne(id);

  await user.update({ username });

  return user;
};

export const remove = async (id) => {
  await db.User.destroy({ where: { id } });

  return { message: 'Successfully removed user' };
};

export const restore = async (id) => {
  const user = await findOne(id, false);

  if (!user.deletedAt) throw new BadRequest('User is not removed');

  await user.restore();

  return { user };
};
