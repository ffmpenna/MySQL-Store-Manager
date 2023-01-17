const { expect } = require("chai");
const sinon = require("sinon");
const { salesService } = require("../../../src/services");
const { salesModel } = require("../../../src/models");
const { rightSaleBody, saleCreateResponse } = require('./mocks/salesServicesMock');

describe("Verificando service de produto", () => {
  describe("Cadastrando uma venda com valores válidos.", () => {
    it("Retorna o Id do produto cadastrado.", async () => {
      sinon.stub(salesModel, "insert").resolves(3);
      sinon.stub(salesModel, "getById").resolves(rightSaleBody);

      const result = await salesService.create(rightSaleBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleCreateResponse);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
