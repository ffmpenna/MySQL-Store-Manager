const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [product] = await connection.execute(query, [`%${name}%`]);
  return product;
};

const insert = async (productName) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [productName]);
  return newProduct.insertId;
};

const update = (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  return connection.execute(query, [name, id]);
};

const deleteById = (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  return connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
  getByName,
};
