const productsService = require('../services/productsService');

const listProducts = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getProduct = async (req, res) => { 
  const { id } = req.params;
  const product = await productsService.getById(id);
  res.status(200).json(product);
};

module.exports = {
  listProducts,
  getProduct,
};