const salesModel = require('../models/salesModel');
const newSaleFormatter = require('../utils/newSaleFormatter');

const create = async (salesData) => {
  const newSaleId = await salesModel.insert(salesData);
  const newSale = await salesModel.getById(newSaleId);

  return { type: null, message: newSaleFormatter(newSaleId, newSale) };
};

module.exports = {
  create,
};