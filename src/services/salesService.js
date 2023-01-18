const { salesModel } = require('../models');
const newSaleFormatter = require('../utils/newSaleFormatter');
const schema = require('./validations/validationsInputValues');

const create = async (saleData) => {
  let error = schema.validateSalesFields(saleData);
  if (error.type) return error;
  error = await Promise.resolve(schema.validateSalesInputs(saleData));
  if (error.type) return error;

  const newSaleId = await salesModel.insert(saleData);
  const newSale = await salesModel.getById(newSaleId);

  return { type: null, message: newSaleFormatter(newSaleId, newSale) };
};

module.exports = {
  create,
};