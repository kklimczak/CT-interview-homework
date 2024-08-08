const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const { validateDto } = require("../middlewares/validate-dto.middleware");

const { createProduct, findProducts } = require("../services/products.service");
const { addProductDtoSchema } = require("../schemas/products.schemas");

const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await findProducts();

  res.json(products);
});

productsRouter.post("/", validateDto(addProductDtoSchema), async (req, res) => {
  const newProduct = await createProduct(req.body);

  res.status(StatusCodes.CREATED).json(newProduct);
});

module.exports = {
  productsRouter,
};
