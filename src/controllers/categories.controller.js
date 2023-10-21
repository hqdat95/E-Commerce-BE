import * as categorySvc from '../services/category.service';

export const create = async (req, res) => {
  const { name, parentId } = req.body;

  const result = await categorySvc.create(name, parentId);

  res.created(result);
};

export const findAllRemoved = async (req, res) => {
  const { parentId } = req.params;

  const result = await categorySvc.findAll(parentId, false);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const { parentId } = req.params;

  const result = await categorySvc.findAll(parentId);

  res.ok(result);
};

export const findOneRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await categorySvc.findOne(id, false);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await categorySvc.findOne(id);

  res.ok(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await categorySvc.update(id, name);

  res.ok(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const result = await categorySvc.remove(id);

  res.ok(result);
};

export const restore = async (req, res) => {
  const { id } = req.params;

  const result = await categorySvc.restore(id);

  res.ok(result);
};
