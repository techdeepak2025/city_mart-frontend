import { z } from "zod";

// Shared schema logic
const nameSchema = z
  .string({ required_error: "Brand name is required" })
  .min(2, "Brand name must be at least 2 characters");

// Add Brand Schema
export const addBrandSchema = z.object({
  name: nameSchema,
  logo: z
    .any({ required_error: "Brand logo is required" })
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file",
    }),
});

// Edit Brand Schema
export const editBrandSchema = z.object({
  name: nameSchema,
  logo: z
    .any()
    .nullable()
    .refine(
      (file) => !file || file instanceof File,
      { message: "Invalid file type" }
    ),
});
