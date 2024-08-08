const { findProducts, createProduct } = require("./products.service");
const { dataSource } = require("../config/data-source");
const { ProductEntity } = require("../entities/product.entity");

jest.mock("../config/data-source", () => ({
  dataSource: {
    getRepository: jest.fn(() => ({
      find: jest.fn(() => []),
    })),
  },
}));

describe("Products Service", () => {
  test("should find all products", async () => {
    const products = await findProducts();

    expect(dataSource.getRepository).toHaveBeenCalledWith(ProductEntity);
    expect(products).toEqual([]);
  });

  test("should create a product", async () => {
    const productDto = {
      name: "Product 1",
      price: 100,
    };
    const product = {
      id: 1,
      ...productDto,
    };
    dataSource.getRepository.mockReturnValue({
      create: jest.fn(() => product),
      save: jest.fn(() => product),
    });

    const createdProduct = await createProduct(productDto);

    expect(dataSource.getRepository).toHaveBeenCalledWith(ProductEntity);
    expect(createdProduct).toEqual(product);
  });
});
