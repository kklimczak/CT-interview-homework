const { z } = require("zod");

const addProductDtoSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0).positive(),
  quantity: z.number().min(0).int(),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
});

const updateProductDtoSchema = z.strictObject({
  name: z.string().min(1).optional(),
  price: z.number().min(0).positive().optional(),
  quantity: z.number().min(0).int().optional(),
  description: z.string().min(1).optional(),
  imageUrl: z.string().min(1).optional(),
});

module.exports = {
  addProductDtoSchema,
  updateProductDtoSchema,
};
