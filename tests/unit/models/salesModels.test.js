const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { rightSaleBody, saleResponse, allSalesResponse } = require("./mocks/salesModelMocks");

describe("Testes de unidade do model de vendas", () => {

  it("Cadastrando uma venda", async () => {

    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);

    const result = await salesModel.insert(rightSaleBody);

    expect(result).to.equal(3);
  });

  it('Recuperando uma lista de venda', async () => {
    sinon.stub(connection, 'execute').resolves(allSalesResponse);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(allSalesResponse);
  });

  it('Recuperando uma venda por Id', async () => {
    sinon.stub(connection, 'execute').resolves(saleResponse)

    const result = await salesModel.getById(saleResponse);

    expect(result).to.be.deep.equal(saleResponse);
  })

  afterEach(() => {
    sinon.restore();
  });
});
