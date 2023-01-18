const { idSchema, nameSchema, registerSaleSchema } = require('./schemas');
const { productsModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validadeName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

const validateSalesFields = (saleData) => {
  const errors = saleData.map((e) => registerSaleSchema.validate(e));
  if (errors.some((err) => err.error)) {
    const { error } = errors.find((sale) => sale.error);
    return {
      type: 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateSalesInputs = async (saleData) => {
  const productsPromise = saleData.map((e) =>
    productsModel.getById(e.productId));
  const productsResolved = await Promise.all(productsPromise);

  if (productsResolved.some((e) => !e)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validadeName,
  validateSalesFields,
  validateSalesInputs,
};
