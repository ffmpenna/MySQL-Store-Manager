const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { products, newProduct, updatedProductRespense, productUpdated } = require("./mocks/productsModelMocks");

describe("Testes de unidade do model de produtos", () => {
  it("Recuperando a lista de produtos", async () => {

    sinon.stub(connection, "execute").resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando um produto a partir do seu id", async () => {

    sinon.stub(connection, "execute").resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it("Cadastrando um produto", async () => {
    
    sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
    
    const result = await productsModel.insert(newProduct);
    
    expect(result).to.equal(4);
  });

  it('Atualizando um produto', async () => {
    sinon.stub(connection, 'execute').resolves([productUpdated]);

    const { id, name } = updatedProductRespense;

    const result = await productsModel.update(id, name);

    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });

  afterEach(() => {
    sinon.restore();
  });
});
