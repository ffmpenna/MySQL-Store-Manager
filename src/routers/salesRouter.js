const express = require('express');
const salesController = require('../controllers/salesController');
const validateNewSaleFields = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.post('/', validateNewSaleFields, salesController.createSale);

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSale);

module.exports = router;
