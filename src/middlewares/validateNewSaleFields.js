const errorMap = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const saleData = req.body;

  if (saleData.some(({ productId }) => !productId)) {
    return res
      .status(errorMap.mapError('BAD_REQUEST'))
      .json({ message: '"productId" is required' });
  }
  if (saleData.some(({ quantity }) => !quantity)) {
    return res
      .status(errorMap.mapError('BAD_REQUEST'))
      .json({ message: '"quantity" is required' });
  }

  return next();
};
