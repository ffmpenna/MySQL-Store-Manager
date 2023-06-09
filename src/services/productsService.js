const productsModel = require('../models/productsModel');
const schema = require('./validations/validationsInputValues');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const create = async (productName) => {
  const error = schema.validadeName(productName);
  if (error.type) return error;

  const newProductId = await productsModel.insert(productName);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const update = async ({ id, name }) => {
  const error = schema.validadeName(name);
  if (error.type) return error;

  const productToUpdate = await productsModel.getById(id);
  if (!productToUpdate) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.update(id, name);

  const productUpdated = await productsModel.getById(id);
  
  return { type: null, message: productUpdated };
};

const deleteById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const productToDelete = await productsModel.getById(productId);
  if (!productToDelete) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.deleteById(productId);

  return { type: null, message: '' };
};

const getByName = async (name) => {
  const products = await productsModel.getByName(name);

   return { type: null, message: products };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getByName,
};
