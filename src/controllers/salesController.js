const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { message } = await salesService.getAll();

  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { type, message } = await salesService.create(saleData);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const deleteSale = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await salesService.deleteById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json(message); 
};

const updateSale = async (req, res) => {
  console.log('ueun');
  const { id } = req.params;
  const updatedData = req.body;

  const { type, message } = await salesService.update(id, updatedData);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
};

module.exports = {
  createSale,
  listSales,
  getSale,
  deleteSale,
  updateSale,
};
