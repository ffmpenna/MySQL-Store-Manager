const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  rightSaleBody,
  saleCreateResponse,
  wrongZeroQuantityBody,
  nonexistentProductIdBody,
  allSalesResponse,
  saleResponse,
  otherProductIdSaleBody,
  saleUpdatedResponse,
} = require('./mocks/salesServicesMock');

describe('Verificando service de venda', () => {
  describe('Cadastrando uma venda com valores válidos.', () => {
    it('Retorna o Id do venda cadastrado.', async () => {
      sinon.stub(salesModel, 'insert').resolves(3);
      sinon.stub(salesModel, 'getById').resolves(rightSaleBody);

      const result = await salesService.create(rightSaleBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleCreateResponse);
    });
  });
  describe('cadastro de uma venda com valores inválidos', () => {
    it('retorna um erro ao passar uma quantidade de vendas inválida', async () => {
      const result = await salesService.create(wrongZeroQuantityBody);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
    it('retorna um erro caso tente registrar uma venda de um vendaId inexistente', async () => {
      const result = await salesService.create(nonexistentProductIdBody);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('Listar vendas.', () => {
    it('Retorna a lista completa de vendas', async () => {
      sinon.stub(salesModel, 'getAll').resolves(allSalesResponse);

      const result = await salesService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSalesResponse);
    });
  });

  describe('Listar venda por id', () => {
    it('Retorna os dados da venda', async () => {
      // arrange
      sinon.stub(salesModel, 'getById').resolves(saleResponse);

      // act
      const result = await salesService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleResponse);
    });

    it('Retorna erro caso id não exista', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await salesService.getById(999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  describe('Deletando uma venda com valores válidos.', () => {
    it('Deleta venda com sucesso.', async () => {
      sinon.stub(salesModel, 'deleteById').resolves();

      const result = await salesService.deleteById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('Deletando uma venda com id inexistente', () => {
    it('Retorna um erro ao passar um id inexistente', async () => {
      const result = await salesService.deleteById(999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  describe('Atualizando uma venda com valores válidos.', () => {
    it('Retorna o Id da venda atualizado', async () => {
      sinon.stub(salesModel, 'update').resolves(1);
      sinon.stub(salesModel, 'getById').resolves(otherProductIdSaleBody);

      const result = await salesService.update(1, otherProductIdSaleBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleUpdatedResponse);
    });
  });

  describe('Atualizando uma venda com id inexistente', () => {
    it('retorna um erro ao passar um id inexistente', async () => {
      const result = await salesService.update(999, otherProductIdSaleBody);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
