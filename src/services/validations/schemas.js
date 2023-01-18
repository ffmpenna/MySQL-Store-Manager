const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required();

const registerSaleSchema = Joi.object({
  productId: Joi.number().integer().label('productId').required(),
  quantity: Joi.number().integer().min(1).label('quantity')
.required(),
});

module.exports = {
  idSchema,
  nameSchema,
  registerSaleSchema,
};
