const productResponse = {
  id: 1,
  name: "Produto1"
};

const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const newProductResponse = {
  id: 4,
  name: "ProdutoX",
};

const productMock = {
  name: 'ProdutoX',
}

const wrongSizeProductBody = { name: "Prod" };

const wrongProductBody = {};

module.exports = {
  productResponse,
  allProductsResponse,
  newProductResponse,
  productMock,
  wrongSizeProductBody,
  wrongProductBody,
};