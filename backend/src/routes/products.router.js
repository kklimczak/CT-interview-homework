import { Router } from "express";
import { findProducts } from "../services/products.service.js";

export const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await findProducts();

  res.json(products);
});
