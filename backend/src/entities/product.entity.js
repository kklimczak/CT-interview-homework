const { EntitySchema } = require("typeorm");

// Decimal type in MariaDB need additional transformer to convert string to number
// due to the fact that MariaDB return decimal as string
class ColumnNumericTransformer {
  to(data) {
    return data;
  }
  from(data) {
    return parseFloat(data);
  }
}

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
      transformer: new ColumnNumericTransformer(),
      precision: 5,
      scale: 2,
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
