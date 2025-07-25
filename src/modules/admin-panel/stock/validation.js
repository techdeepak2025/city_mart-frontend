import { z } from "zod";

export const productStockSchema = z.object({
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),
});
