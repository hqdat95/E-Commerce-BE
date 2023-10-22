import db from '../models';
import * as driveSvc from './drive.service';
import * as productSvc from './product.service';
import { BadRequest, NotFound } from '../core/error.response';

const findFolderId = async (productId) => {
  const product = await productSvc.findOne(productId);
  const folderId = await driveSvc.getFolderId(product.name);

  if (!folderId) throw new NotFound('Folder Not Found');

  return folderId;
};

export const upload = async (productId, files) => {
  if (!files) throw new BadRequest('No files were uploaded');

  const product = await productSvc.findOne(productId);
  const folderUrl = await driveSvc.uploads(product.name, files);

  let productImage = await db.ProductImage.findOne({ where: { url: folderUrl } });

  if (!productImage) {
    return (productImage = await db.ProductImage.create({
      url: folderUrl,
      productId,
    }));
  }

  return productImage;
};

export const findAll = async (paranoid = true) => {
  return db.ProductImage.findAll({ paranoid });
};

export const findImages = async (productId) => {
  const folderId = await findFolderId(productId);

  const files = await driveSvc.executeQuery(`'${folderId}' in parents`);

  return files.map((file) => ({
    id: file.id,
    name: file.name,
  }));
};

export const findOne = async (productId, paranoid = true) => {
  const ProdImages = await db.ProductImage.findOne({ where: { productId }, paranoid });

  if (!ProdImages) throw new NotFound('Product images not found');

  return ProdImages;
};

export const update = async (productId, files) => {
  await findOne(productId);

  const folderId = await findFolderId(productId);

  await driveSvc.manageImages(folderId, false);

  return upload(productId, files);
};

export const remove = async (productId) => {
  const prodImages = await findOne(productId);
  const folderId = await findFolderId(productId);

  return await Promise.all([prodImages.destroy(), driveSvc.trashItem(folderId)]);
};

export const restore = async (productId) => {
  const prodImages = await findOne(productId, false);
  const folderId = await findFolderId(productId);

  return await Promise.all([prodImages.restore(), driveSvc.trashItem(folderId, false)]);
};
