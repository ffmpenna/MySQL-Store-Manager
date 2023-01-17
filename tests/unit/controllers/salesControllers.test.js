const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { rightSaleBody, saleCreateResponse } = require("./mocks/salesControllerMocks");

describe("Teste de unidade do salesController.", () => {
  describe("Cadastrar novas vendas com valores válidos.", () => {
    it("Deve retornar o status 201 e os dados da venda.", async () => {
      const res = {};
      const req = {
        body: rightSaleBody
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "create")
        .resolves({ type: null, message: saleCreateResponse });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});
