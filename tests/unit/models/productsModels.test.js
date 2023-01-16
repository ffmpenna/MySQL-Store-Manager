const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { products } = require("./mocks/productsModelMocks");

describe("Testes de unidade do model de produtos", () => {
  it("Recuperando a lista de produtos", async () => {

    sinon.stub(connection, "execute").resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando um produto a partir do seu id", async function () {

    sinon.stub(connection, "execute").resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});
