const {
  findProducts,
  createProduct,
  removeProduct,
} = require("./products.service");
const { dataSource } = require("../config/data-source");
const { ProductEntity } = require("../entities/product.entity");
const { AppError } = require("../middlewares/error-handler.middleware");
const { StatusCodes } = require("http-status-codes");

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

  test("should remove a product", async () => {
    const product = {
      id: 1,
      name: "Product 1",
      price: 100,
    };
    dataSource.getRepository.mockReturnValue({
      findOne: jest.fn(() => product),
      remove: jest.fn(() => product),
    });

    const removedProduct = await removeProduct(product.id);

    expect(dataSource.getRepository).toHaveBeenCalledWith(ProductEntity);
    expect(removedProduct).toEqual(product);
  });

  test("should throw an error when trying to remove a non-existent product", async () => {
    const productId = 1;
    dataSource.getRepository.mockReturnValue({
      findOne: jest.fn(() => undefined),
    });

    try {
      await removeProduct(productId);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("Product not found");
      expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
    }
  });
});
