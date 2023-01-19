const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.getAll();

  res.status(200).json(message);
};

const getProduct = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.create(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => { 
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update({ id, name });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message); 
};

const deleteProduct = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await productsService.deleteById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json(message); 
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};