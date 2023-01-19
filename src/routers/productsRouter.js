const express = require('express');
const productsController = require('../controllers/productsController');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.post('/', validateNewProductFields, productsController.createProduct);

router.put('/:id', validateNewProductFields, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
