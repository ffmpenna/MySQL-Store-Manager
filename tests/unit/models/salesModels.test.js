const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { rightSaleBody, saleResponse, allSalesResponse, saleDeleted } = require("./mocks/salesModelMocks");

describe("Testes de unidade do model de vendas", () => {

  it("Cadastrando uma venda", async () => {

    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);

    const result = await salesModel.insert(rightSaleBody);

    expect(result).to.equal(3);
  });

  it('Recuperando uma lista de venda', async () => {
    sinon.stub(connection, 'execute').resolves([allSalesResponse]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(allSalesResponse);
  });

  it('Recuperando uma venda por Id', async () => {
    sinon.stub(connection, 'execute').resolves([saleResponse])

    const result = await salesModel.getById(saleResponse);

    expect(result).to.be.deep.equal(saleResponse);
  });

  it('Deletando uma venda', async () => {
    sinon.stub(connection, 'execute').resolves([saleDeleted]);

    const result = await salesModel.deleteById(1);

    expect(result[0].affectedRows).to.be.deep.equal(1);
  });


  afterEach(() => {
    sinon.restore();
  });
});
