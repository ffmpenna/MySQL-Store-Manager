module.exports = (saleId, saleData) => ({
  saleId,
  itemsUpdated: saleData.map((e) => ({
    productId: e.productId,
    quantity: e.quantity,
  })),
});