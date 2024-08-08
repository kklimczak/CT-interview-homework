import { Router } from "express";
import { dataSource } from "../config/data-source.js";
import { ProductEntity } from "../entities/product.entity.js";

export const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await dataSource.getRepository(ProductEntity).find();

  res.json(products);
});
