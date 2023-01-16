const errorMap = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(errorMap.mapError('BAD_REQUEST'))
      .json({ message: '"name" is required' });
  }

  return next();
};
