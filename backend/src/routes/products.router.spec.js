const request = require("supertest");
const app = require("../app");

const product = {
  id: 1,
  name: "Product 1",
  price: 100,
};

jest.mock("../config/data-source", () => ({
  dataSource: {
    getRepository: jest.fn(() => ({
      find: jest.fn(() => []),
      findOne: jest.fn((id) => {
        if (id === 1) {
          return {
            ...product,
          };
        }
        return null;
      }),
      create: jest.fn(() => product),
      save: jest.fn(() => product),
    })),
  },

  initializeDb: () => Promise.resolve(),
}));

describe("products.router", () => {
  test("GET /products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("POST /products", async () => {
    const addProductDto = {
      name: "Product 1",
      price: 100,
      quantity: 1,
      description: "description",
      imageUrl: "https://www.example.com/image.png",
    };
    const response = await request(app)
      .post("/api/products")
      .send({ ...addProductDto });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(product);
  });
});
