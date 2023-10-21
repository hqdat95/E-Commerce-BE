import * as userSvc from '../services/user.service';

export const findAllRemoved = async (req, res) => {
  const { page } = req.query;

  const result = await userSvc.findAll(false, page);

  res.ok(result);
};

export const findOneRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.findOne(id, false);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const { page } = req.query;

  const result = await userSvc.findAll(true, page);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.findOne(id);

  res.ok(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const result = await userSvc.update(id, username);

  res.ok(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.remove(id);

  res.ok(result);
};

export const restore = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.restore(id);

  res.ok(result);
};
