import db from '../models';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { BadRequest, NotFound } from '../core/error.response';

export const create = async (userId, req, name, phone, address) => {
  if (!userId) {
    const now = new Date().toISOString();

    const info = { id: uuidv4(), name, phone, address, createdAt: now, updatedAt: now };

    if (!req.session.temp_info) req.session.temp_info = [];

    req.session.temp_info.push(info);

    return info;
  }

  const { count, rows } = await db.TransportInfo.findAndCountAll({ where: { userId } });

  if (count >= 5) throw new BadRequest(`Can't have more than 5 transport infos`);

  const isDefaultExists = rows.find((info) => info.isDefault);

  const isDefault = !isDefaultExists;

  return await db.TransportInfo.create({ name, phone, address, userId, isDefault });
};

export const findAll = async (userId, req, paranoid = true) => {
  if (!userId) {
    const infos = req.session.temp_info;

    if (!infos || infos.length === 0) {
      return (req.session.temp_info = []);
    }

    return infos;
  }

  return await db.TransportInfo.findAll({
    where: { userId },
    order: [['isDefault', 'DESC']],
    paranoid,
  });
};

export const findOne = async (userId, id, req, paranoid = true) => {
  if (!userId) {
    const info = req.session.temp_info.filter((info) => info.id === id);

    if (info.length === 0) throw new NotFound('Temporary transport info not found');

    return info[0];
  }

  const result = await db.TransportInfo.findOne({ where: { id, userId }, paranoid });

  if (!result) throw new NotFound('Transport info not found');

  return result;
};

export const update = async (userId, id, req, data) => {
  if (!userId) {
    const info = await findOne(null, id, req);

    Object.assign(info, data, { updatedAt: new Date().toISOString() });

    return info;
  }

  const info = await findOne(userId, id);

  data.isDefault &&
    (await db.TransportInfo.update({ isDefault: false }, { where: { userId: userId, id: { [Op.ne]: id } } }));

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await info.update(data);

  return info.reload();
};

export const remove = async (userId, id, req) => {
  if (!userId) {
    const infoToDelete = await findOne(null, id, req);

    const index = req.session.temp_info.indexOf(infoToDelete);

    req.session.temp_info.splice(index, 1);

    return { message: 'Successfully removed transport info' };
  }

  const info = await findOne(userId, id);

  if (info.isDefault) {
    await info.update({ isDefault: false });

    const newDefault = await db.TransportInfo.findOne({
      where: { userId, id: { [Op.ne]: id } },
      order: [['createdAt', 'ASC']],
    });

    newDefault && (await newDefault.update({ isDefault: true }));
  }

  await info.destroy();

  return { message: 'Successfully removed transport info' };
};

export const restore = async (userId, id, req) => {
  const info = await findOne(userId, id, req, false);

  if (!info.deletedAt) throw new BadRequest('Transport Info is not removed');

  return await info.restore();
};
