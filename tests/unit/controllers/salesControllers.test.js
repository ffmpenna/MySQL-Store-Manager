const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const {
  rightSaleBody,
  saleCreateResponse,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
} = require("./mocks/salesControllerMocks");

describe("Teste de unidade do salesController.", () => {
  describe("Cadastrar novas vendas com valores válidos.", () => {
    it("Deve retornar o status 201 e os dados da venda.", async () => {
      const res = {};
      const req = {
        body: rightSaleBody,
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
  describe("Cadastrar novas vendas com valores inválidos.", () => {
    it("Se algum item da requisição não tiver o campo 'productId' deve retornar status 400", async () => {
      const res = {};
      const req = {
        body: wrongSaleNotProductIdBody,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "create")
        .resolves({ type: "BAD_REQUEST", message: "'productId' is required" });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: "'productId' is required",
      });
    });
    it("Se algum item da requisição não tiver o campo 'quantity' deve retornar status 400", async () => {
      const res = {};
      const req = {
        body: wrongSaleNotQuantityBody,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "create")
        .resolves({ type: "BAD_REQUEST", message: "'quantity' is required" });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: "'quantity' is required",
      });
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});
