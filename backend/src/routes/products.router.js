const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const { validateDto } = require("../middlewares/validate-dto.middleware");

const {
  createProduct,
  findProducts,
  removeProduct,
} = require("../services/products.service");
const { addProductDtoSchema } = require("../schemas/products.schemas");
const { AppError } = require("../middlewares/error-handler.middleware");

const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await findProducts();

  res.json(products);
});

productsRouter.post("/", validateDto(addProductDtoSchema), async (req, res) => {
  const newProduct = await createProduct(req.body);

  res.status(StatusCodes.CREATED).json(newProduct);
});

productsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new AppError(StatusCodes.BAD_REQUEST, "Missing id param!"));
  }

  try {
    await removeProduct(id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  productsRouter,
};
