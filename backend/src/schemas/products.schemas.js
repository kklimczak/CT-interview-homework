const { z } = require("zod");

const addProductDtoSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0).positive(),
  quantity: z.number().min(0).int(),
});

const updateProductDtoSchema = z.strictObject({
  name: z.string().min(1).optional(),
  price: z.number().min(0).positive().optional(),
  quantity: z.number().min(0).int().optional(),
});

module.exports = {
  addProductDtoSchema,
  updateProductDtoSchema,
};
