const wrongSaleNotProductIdBody = [{ quantity: 1 }];
const wrongSaleNotQuantityBody = [{ productId: 1 }];
const nonexistentProductIdBody = [{ productId: 9999, quantity: 1 }];
const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];
const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];
const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];
const otherProductIdSaleBody = [
  { productId: 1, quantity: 10 },
  { productId: 2, quantity: 50 },
];
const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];
const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const saleUpdatedResponse = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

const allSalesResponse = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: '2021-10-09T04:54:54.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleResponse = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  otherProductIdSaleBody,
  rightSaleBody,
  saleCreateResponse,
  allSalesResponse,
  saleResponse,
  saleUpdatedResponse,
};
