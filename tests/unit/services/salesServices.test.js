const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  rightSaleBody,
  saleCreateResponse,
  wrongZeroQuantityBody,
  nonexistentProductIdBody,
} = require('./mocks/salesServicesMock');

describe('Verificando service de produto', () => {
  describe('Cadastrando uma venda com valores válidos.', () => {
    it('Retorna o Id do produto cadastrado.', async () => {
      sinon.stub(salesModel, 'insert').resolves(3);
      sinon.stub(salesModel, 'getById').resolves(rightSaleBody);

      const result = await salesService.create(rightSaleBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleCreateResponse);
    });
  });
  describe('cadastro de uma venda com valores inválidos', () => {
    it('retorna um erro ao passar uma quantidade de produtos inválida', async () => {
      const result = await salesService.create(wrongZeroQuantityBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        "\"quantity\" must be greater than or equal to 1"
      );
    });
    it('retorna um erro caso tente registrar uma venda de um produtoId inexistente', async () => {
      const result = await salesService.create(nonexistentProductIdBody);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal(
        'Product not found'
      );
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});
