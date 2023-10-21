import * as infoSvc from '../services/info.service';

export const create = async (req, res) => {
  const userId = req.userId;
  const { name, phone, address } = req.body;

  const result = await infoSvc.create(userId, req, name, phone, address);

  res.created(result);
};

export const findAllRemoved = async (req, res) => {
  const user = req.user;

  const result = await infoSvc.findAll(user.id, req, false);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const userId = req.userId;

  const result = await infoSvc.findAll(userId, req);

  res.ok(result);
};

export const findOneRemoved = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const result = await infoSvc.findOne(user.id, id, req, false);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const result = await infoSvc.findOne(userId, id, req);

  res.ok(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const data = req.body;

  const result = await infoSvc.update(userId, id, req, data);

  res.ok(result);
};

export const remove = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const result = await infoSvc.remove(userId, id, req);

  res.ok(result);
};

export const restore = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const result = await infoSvc.restore(user.id, id, req);

  res.ok(result);
};
