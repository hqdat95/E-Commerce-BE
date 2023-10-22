import * as cartItemSvc from '../services/cart.service';

export const create = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  const result = await cartItemSvc.create(userId, productId, req);

  res.created(result);
};

export const findAllRemoved = async (req, res) => {
  const userId = req.user.id;

  const result = await cartItemSvc.findAll(userId, req, false);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const userId = req.userId;

  const result = await cartItemSvc.findAll(userId, req);

  res.ok(result);
};

export const findOneRemoved = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await cartItemSvc.findOne(userId, id, req, false);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const result = await cartItemSvc.findOne(userId, id, req);

  res.ok(result);
};

export const update = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  const result = await cartItemSvc.update(userId, id, quantity, req);

  res.ok(result);
};

export const remove = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const result = await cartItemSvc.remove(userId, id, req);

  res.ok(result);
};

export const restore = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await cartItemSvc.restore(userId, id, req);

  res.ok(result);
};
