const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (req, res) => {
  const { message } = await salesService.getAll();

  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { type, message } = await salesService.create(saleData);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
  listSales,
};