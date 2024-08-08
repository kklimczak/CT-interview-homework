const { dataSource } = require("../config/data-source");
const { ProductEntity } = require("../entities/product.entity");
const { AppError } = require("../middlewares/error-handler.middleware");
const { StatusCodes } = require("http-status-codes");

async function findProducts() {
  return dataSource.getRepository(ProductEntity).find();
}

async function createProduct(productDto) {
  const product = dataSource.getRepository(ProductEntity).create(productDto);
  return dataSource.getRepository(ProductEntity).save(product);
}

async function removeProduct(id) {
  const product = await dataSource.getRepository(ProductEntity).findOne({
    where: { id },
  });
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  return dataSource.getRepository(ProductEntity).remove(product);
}

module.exports = {
  findProducts,
  createProduct,
  removeProduct,
};
