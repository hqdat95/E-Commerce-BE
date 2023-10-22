import * as imageSvc from '../services/image.service';

export const upload = async (req, res) => {
  const { productId } = req.params;

  const files = Array.isArray(req.files) ? req.files : [req.file];

  const result = await imageSvc.upload(productId, files);

  res.created(result);
};

export const findAllRemoved = async (req, res) => {
  const result = await imageSvc.findAll(false);

  res.ok(result);
};

export const findAll = async (req, res) => {
  const result = await imageSvc.findAll();

  res.ok(result);
};

export const findByProductId = async (req, res) => {
  const { productId } = req.params;

  const result = await imageSvc.findImages(productId);

  res.ok(result);
};

export const findOneRemoved = async (req, res) => {
  const { productId } = req.params;

  const result = await imageSvc.findOne(productId, false);

  res.ok(result);
};

export const findOne = async (req, res) => {
  const { productId } = req.params;

  const result = await imageSvc.findOne(productId);

  res.ok(result);
};

export const update = async (req, res) => {
  const { productId } = req.params;

  const files = Array.isArray(req.files) ? req.files : [req.file];

  const result = await imageSvc.update(productId, files);

  res.ok(result);
};

export const remove = async (req, res) => {
  const { productId } = req.params;

  const result = await imageSvc.remove(productId);

  res.ok(result);
};

export const restore = async (req, res) => {
  const { productId } = req.params;

  const result = await imageSvc.restore(productId);

  res.ok(result);
};
