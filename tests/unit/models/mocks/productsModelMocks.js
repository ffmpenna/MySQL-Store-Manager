const products = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const newProduct = {
  name: "ProdutoX"
}

const updatedProductRespense = {
  id: 1,
  name: 'Martelo do Batman',
};

const productUpdated = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1,
};

const productDeleted = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
};

module.exports = {
  products,
  newProduct,
  updatedProductRespense,
  productUpdated,
  productDeleted,
};
