const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
  ORDER BY sale_id;`;

  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const getById = async (saleId) => {
  const query = `SELECT sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE s.id = ?;`;

  const [sale] = await connection.execute(query, [saleId]);
  return camelize(sale);
};

const insert = async (saleData) => {
  const queryIntoSales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [newSale] = await connection.execute(queryIntoSales);

  const soldProducts = saleData
    .map(
      ({ productId, quantity }) =>
        `(${newSale.insertId}, ${productId}, ${quantity})`,
    )
    .join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
      VALUES ${soldProducts}`,
  );

  return newSale.insertId;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  return connection.execute(query, [id]);
};

const update = async (saleId, saleData) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [saleId]);

  const soldProducts = saleData
    .map(({ productId, quantity }) => `(${saleId}, ${productId}, ${quantity})`)
    .join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES ${soldProducts}`,
  );

  return saleId;
};

module.exports = {
  getById,
  insert,
  getAll,
  deleteById,
  update,
};
