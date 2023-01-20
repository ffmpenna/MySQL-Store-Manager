const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const {
  allProducts,
  validName,
  invalidName,
  updatedProductRespense,
  filteredProductsResponse,
} = require('./mocks/productsServicesMocks');

describe('Verificando service de produto', () => {
  describe('Listagem de produtos', () => {
    it('Retorna a lista completa de produtos', async () => {
      // arrange
      sinon.stub(productsModel, 'getAll').resolves(allProducts);

      // act
      const result = await productsService.getAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Busca de um produto', () => {
    it('retorna um erro caso receba um ID inválido', async () => {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsService.getById('a');

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a produto não existe', async () => {
      // arrange
      sinon.stub(productsModel, 'getById').resolves(undefined);

      // act
      const result = await productsService.getById(1);

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna a produto caso ID existente', async () => {
      // arrange
      sinon.stub(productsModel, 'getById').resolves(allProducts[0]);

      // act
      const result = await productsService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  describe('Cadastrando um produto com valores válidos.', () => {
    it('Retorna o Id do produto cadastrado.', async () => {
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'getById').resolves(allProducts[0]);

      const result = await productsService.create(validName);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  describe('cadastro de um produto com valores inválidos', () => {
    it('retorna um erro ao passar um nome inválido', async () => {
      const result = await productsService.create(invalidName);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe('Atualizando um produto com valores válidos.', () => {
    it('Retorna o Id do produto atualizado', async () => {
      sinon.stub(productsModel, 'update').resolves(1);
      sinon.stub(productsModel, 'getById').resolves(updatedProductRespense);

      const result = await productsService.update(updatedProductRespense);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedProductRespense);
    });
  });

  describe('Atualizando um produto com id inexistente', () => {
    it('retorna um erro ao passar um id inexistente', async () => {
      sinon.stub(productsModel, 'getById').resolves(false);

      const result = await productsService.update({
        id: 1,
        name: 'Martelo do Batman',
      });

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('retorna um erro ao passar um nome inválido', async () => {
      const result = await productsService.update({
        id: 1,
        name: invalidName,
      });

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe('Deletando um produto com valores válidos.', () => {
    it('Deleta produto com sucesso.', async () => {
      sinon.stub(productsModel, 'deleteById').resolves();

      const result = await productsService.deleteById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('Deletando um produto com valores inválidos', () => {
    it('Retorna um erro ao passar um id inválido', async () => {
      const result = await productsService.deleteById('invalid_value');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

  it('Retorna um erro ao passar um id inexistente', async () => {
      const result = await productsService.deleteById(999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('Pesquisando produtos pelo nome.', () => {
    it('Retorna a lista de produtos filtrados', async () => {
      sinon.stub(productsModel, 'getByName').resolves(filteredProductsResponse);

      const result = await productsService.getByName('Martelo');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(filteredProductsResponse);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
