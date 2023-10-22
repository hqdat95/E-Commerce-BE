import db from '../models';
import { v4 as uuidv4 } from 'uuid';
import * as productSvc from './product.service';
import { BadRequest, NotFound } from '../core/error.response';

export const create = async (userId, productId, req) => {
  if (!userId) {
    return await tempCreate(req, productId);
  }

  const product = await productSvc.findOne(productId);

  const cartItem = await db.CartItem.findOne({ where: { userId, productId: product.id } });

  if (cartItem) {
    return await cartItem.update({ quantity: cartItem.quantity + 1 });
  }

  return await db.CartItem.create({ quantity: 1, userId, productId: product.id });
};

export const findAll = async (userId, req, paranoid = true) => {
  if (!userId) {
    return await tempFindAll(req);
  }

  return await db.CartItem.findAll({ where: { userId }, paranoid });
};

export const findOne = async (userId, id, req, paranoid = true) => {
  if (!userId) {
    return await tempFindOne(req, id);
  }

  const cartItem = await db.CartItem.findOne({ where: { id, userId }, paranoid });

  if (!cartItem) throw new NotFound('Cart item not found');

  return cartItem;
};

export const update = async (userId, id, quantity, req) => {
  if (!userId) {
    return await tempUpdate(req, id, quantity);
  }

  const cartItem = await findOne(userId, id);

  return await cartItem.update({ quantity: parseFloat(quantity) });
};

export const remove = async (userId, id, req) => {
  if (!userId) {
    return await tempDelete(req, id);
  }

  await db.CartItem.destroy({ where: { userId, id } });

  return { message: 'Successfully removed cart item' };
};

export const restore = async (userId, id, req) => {
  const cartItem = await findOne(userId, id, req, false);

  if (!cartItem.deletedAt) throw new BadRequest(`Cart Item isn't removed`);

  return await cartItem.restore();
};

const tempCreate = async (req, productId) => {
  const now = new Date().toISOString();

  req.session.temp_cart_items = req.session.temp_cart_items || [];

  await productSvc.findOne(productId);

  const existingItem = req.session.temp_cart_items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.updatedAt = now;

    return existingItem;
  }

  const tempCartItem = { id: uuidv4(), quantity: 1, productId, createdAt: now, updatedAt: now };

  req.session.temp_cart_items.push(tempCartItem);

  return tempCartItem;
};

const tempFindAll = async (req) => {
  const tempCartItem = req.session.temp_cart_items;

  if (!tempCartItem || tempCartItem.length === 0) {
    return (req.session.temp_cart_items = []);
  }

  return tempCartItem;
};

const tempFindOne = async (req, id) => {
  const tempCartItem = req.session.temp_cart_items.find((item) => item.id === id);

  if (!tempCartItem) throw new NotFound('Temporary cart item not found');

  return tempCartItem;
};

const tempUpdate = async (req, id, quantity) => {
  const now = new Date().toISOString();

  const tempCartItem = await tempFindOne(req, id);

  tempCartItem.quantity = parseFloat(quantity);
  tempCartItem.updatedAt = now;

  return tempCartItem;
};

const tempDelete = async (req, id) => {
  const tempCartItem = await tempFindAll(req);

  const index = tempCartItem.findIndex((info) => info.id === id);

  if (index === -1) {
    throw new NotFound('Temporary cart items with specified id not found');
  }

  await tempCartItem.splice(index, 1)[0];

  return { message: 'Successfully removed temporary cart item' };
};
