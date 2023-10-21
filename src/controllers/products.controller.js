import * as productSvc from '../services/product.service';

export const create = async (req, res) => {
  const data = req.body;

  const result = await productSvc.create(data);

  res.created(result);
};

export const findAllRemoved = async (req, res) => {
  const { page } = req.query;

  const result = await productSvc.findAll(false, page);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const { page } = req.query;

  const result = await productSvc.findAll(true, page);

  res.ok(result);
};

export const findByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  const { page } = req.query;

  const result = await productSvc.findByCategoryId(categoryId, page);

  res.ok(result);
};

export const search = async (req, res) => {
  const { keywords, page } = req.query;

  const products = await productSvc.search(keywords, page);

  res.ok(products);
};

export const findOneRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await productSvc.findOne(id, false);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await productSvc.findOne(id);

  res.ok(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await productSvc.update(id, data);

  res.ok(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const result = await productSvc.remove(id);

  res.ok(result);
};

export const restore = async (req, res) => {
  const { id } = req.params;

  const result = await productSvc.restore(id);

  res.ok(result);
};
