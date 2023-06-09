const { salesModel } = require('../models');
const newSaleFormatter = require('../utils/newSaleFormatter');
const updatedSaleFormatter = require('../utils/updatedSaleFormatter');
const schema = require('./validations/validationsInputValues');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }
  return { type: null, message: sale };
};

const create = async (saleData) => {
  let error = schema.validateSalesFields(saleData);
  if (error.type) return error;
  error = await Promise.resolve(schema.validateSalesInputs(saleData));
  if (error.type) return error;

  const newSaleId = await salesModel.insert(saleData);
  const newSale = await salesModel.getById(newSaleId);

  return { type: null, message: newSaleFormatter(newSaleId, newSale) };
};

const deleteById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const saleToDelete = await salesModel.getById(id);
  if (!saleToDelete.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModel.deleteById(id);

  return { type: null, message: '' };
};

const update = async (id, saleData) => {
  let error = schema.validateSalesFields(saleData);
  if (error.type) return error;
  error = await Promise.resolve(schema.validateSalesInputs(saleData));
  if (error.type) return error;
  error = schema.validateId(id);
  if (error.type) return error;
  const saleToUpdate = await salesModel.getById(id);
  if (!saleToUpdate.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  const updatedSaleId = await salesModel.update(id, saleData);
  const updatedSale = await salesModel.getById(updatedSaleId);

  return { type: null, message: updatedSaleFormatter(updatedSaleId, updatedSale) };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  update,
};
