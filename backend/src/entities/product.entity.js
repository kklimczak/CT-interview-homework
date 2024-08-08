import { EntitySchema } from "typeorm";

export const ProductEntity = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    price: {
      type: "decimal",
    },
    quantity: {
      type: "int",
    },
  },
});
