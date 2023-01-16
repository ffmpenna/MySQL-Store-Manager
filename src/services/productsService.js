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
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const create = async (productName) => {
  const error = schema.validadeName(productName);
  if (error.type) return error;

  const newProductId = await productsModel.insert(productName);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  create,
};