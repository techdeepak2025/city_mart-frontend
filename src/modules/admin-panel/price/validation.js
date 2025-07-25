import { z } from "zod";

export const productPricingSchema = z
  .object({
    mrp: z
      .number({ invalid_type_error: "MRP must be a number" })
      .positive("MRP must be greater than 0"),
    discount: z
      .number({ invalid_type_error: "Discount must be a number" })
      .min(0, "Discount cannot be less than 0%")
      .max(100, "Discount cannot exceed 100%"),
    price: z.number({ invalid_type_error: "Price must be a number" }),
  })
  .superRefine((data, ctx) => {
    const expected = Math.round(data.mrp - (data.discount / 100) * data.mrp);
    if (data.price !== expected) {
      ctx.addIssue({
        path: ["price"],
        code: z.ZodIssueCode.custom,
        message: `Price must be equal to MRP - (discount%). Expected ₹${expected}`,
      });
    }
  });
