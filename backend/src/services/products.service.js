const { dataSource } = require("../config/data-source");
const { ProductEntity } = require("../entities/product.entity");

async function findProducts() {
  return dataSource.getRepository(ProductEntity).find();
}

async function createProduct(productDto) {
  const product = dataSource.getRepository(ProductEntity).create(productDto);
  return dataSource.getRepository(ProductEntity).save(product);
}

module.exports = {
  findProducts,
  createProduct,
};
