module.exports = (saleId, saleData) => ({
  id: saleId,
  itemsSold: saleData.map((e) => ({
    productId: e.productId,
    quantity: e.quantity,
  })),
});