const { EntitySchema } = require("typeorm");

const ProductEntity = new EntitySchema({
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
    description: {
      type: "text",
    },
    imageUrl: {
      type: "varchar",
    },
  },
});

module.exports = {
  ProductEntity,
};
