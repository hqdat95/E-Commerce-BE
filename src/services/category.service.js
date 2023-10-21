import db from '../models';
import { Op } from 'sequelize';
import { BadRequest, NotFound, Unauthorized } from '../core/error.response';

const checkExistence = async (name, parentId) => {
  const isExists = await db.Category.findOne({ where: { name, parentId } });

  if (isExists) throw new Unauthorized('Category already exists');
};

const processCategory = async (category, action) => {
  const children = await findAll(category.id, false);

  const categories = await action(category);

  if (Array.isArray(children) && children.length > 0) {
    for (const child of children) {
      await processCategory(child, action);
    }
  }

  return categories;
};

export const create = async (name, parentId = null) => {
  if (parentId !== null) {
    const parentCategory = await db.Category.findByPk(parentId);

    if (!parentCategory) throw new NotFound('Invalid parent category');
  }

  await checkExistence(name, parentId);

  return await db.Category.create({ name, parentId });
};

export const findAll = async (parentId = null, paranoid = true) => {
  return await db.Category.findAll({
    where: { parentId: parentId ? parentId : { [Op.is]: null } },
    order: [['parentId', 'ASC']],
    paranoid,
  });
};

export const findOne = async (id, paranoid = true) => {
  const category = await db.Category.findOne({ where: { id }, paranoid });

  if (!category) throw new NotFound('Category not found');

  return category;
};

export const update = async (id, name) => {
  const category = await findOne(id);

  await checkExistence(name, category.parentId);

  return await category.update({ name });
};

export const remove = async (id) => {
  const category = await findOne(id);

  await processCategory(category, (item) => item.destroy());

  return { message: 'Successfully removed categories' };
};

export const restore = async (id) => {
  const category = await findOne(id, false);

  if (!category.deletedAt) throw new BadRequest(`Category isn't removed`);

  await processCategory(category, (item) => item.restore());

  return { category };
};
