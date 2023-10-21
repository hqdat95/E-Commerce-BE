import db from '../models';
import { Op } from 'sequelize';
import pagination from '../utils/pagination.util';
import * as categorySvc from './category.service';
import { NotFound, Unauthorized } from '../core/error.response';

const checkIsExists = async (name, categoryId) => {
  const isExists = await db.Product.count({ where: { name, categoryId } });

  if (isExists > 0) throw new Unauthorized('Product already exists in this category');
};

export const create = async (data) => {
  await categorySvc.findOne(data.categoryId);

  await checkIsExists(data.name, data.categoryId);

  return await db.Product.create(data);
};

export const findAll = async (paranoid = true, page) => {
  const { totalPages, limit, offset } = await pagination(db.Product, paranoid, page);

  const products = await db.Product.findAll({ order: [['name', 'ASC']], paranoid, limit, offset });

  return { totalPages, data: products };
};

export const findByCategoryId = async (categoryId, page, paranoid = true) => {
  const where = { categoryId };

  await categorySvc.findOne(categoryId);

  const { totalPages, limit, offset } = await pagination(db.Product, paranoid, page, where);

  const products = await db.Product.findAll({ where, order: [['name', 'ASC']], limit, offset });

  return { totalPages, data: products };
};

export const search = async (keywords, page, paranoid = true) => {
  if (!keywords) {
    return { totalPages: 0, data: [] };
  }

  const words = keywords
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, '')
    .split(' ')
    .map((word) => ({ name: { [Op.substring]: word.toLowerCase() } }));

  const where = { [Op.and]: words };

  const { totalPages, limit, offset } = await pagination(db.Product, paranoid, page, where);

  const products = await db.Product.findAll({ where, order: [['name', 'ASC']], limit, offset });

  return { totalPages, data: products };
};

export const findOne = async (id, paranoid = true) => {
  const product = await db.Product.findByPk(id, { paranoid });

  if (!product) throw new NotFound('Product Not Found');

  return product;
};

export const update = async (id, data) => {
  const product = await findOne(id);

  if (data.name) {
    await checkIsExists(data.name, product.categoryId);
  }

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await product.update(data);

  return product.reload();
};

export const remove = async (id) => {
  await db.Product.destroy({ where: { id } });

  return { message: 'Successfully removed product' };
};

export const restore = async (id) => {
  const product = await findOne(id, false);

  if (!product.deletedAt) throw new NotFound(`Product isn't removed`);

  await product.restore();

  return product;
};
