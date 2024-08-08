import { dataSource } from "../config/data-source.js";
import { ProductEntity } from "../entities/product.entity.js";

export async function findProducts() {
  return dataSource.getRepository(ProductEntity).find();
}
