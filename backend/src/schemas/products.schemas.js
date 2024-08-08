const { z } = require("zod");

const addProductDtoSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0).positive(),
  quantity: z.number().min(0).int(),
});

module.exports = {
  addProductDtoSchema,
};
