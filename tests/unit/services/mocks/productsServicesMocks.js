const allProducts = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const validName = 'ProdutoX';
const invalidName = "Prod";

const updatedProductRespense = {
  id: 1,
  name: 'Martelo do Batman',
};

const filteredProductsResponse = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

module.exports = {
  allProducts,
  validName,
  invalidName,
  updatedProductRespense,
  filteredProductsResponse,
};
