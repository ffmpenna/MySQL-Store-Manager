const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const {
  allProductsResponse,
  productResponse,
} = require("./mocks/productsControllerMocks");

describe("Teste de unidade do productsController", () => {
  describe("Listando todos os produtos", () => {
    it("Deve retornar o status 200 e a lista", async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves({ type: null, message: allProductsResponse });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe("Buscando um produto", () => {
    it("Deve retornar status 200 e os dados do banco quando existir", async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: null, message: productResponse });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productResponse);
    });
    it("Ao passar um id inválido deve retornar um erro", async () => {
      const res = {};
      const req = {
        params: { id: "invalid_value" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });
  });
  afterEach(() => {
    sinon.restore();
  });
});
