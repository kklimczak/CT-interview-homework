const { z } = require("zod");

const newShipmentSchema = z.array(
  z.object({
    id: z.number().positive(),
    quantity: z.number().positive(),
  }),
);

module.exports = { newShipmentSchema };
