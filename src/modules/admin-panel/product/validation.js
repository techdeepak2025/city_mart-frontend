import { z } from "zod";

const baseProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  measurement: z.string().min(1, "Measurement is required"),
  unit: z.string().min(1, "Unit is required"),

  // ✅ Fix here
  mrp: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ invalid_type_error: "MRP must be a number" })
      .nonnegative("MRP must be a non-negative number")
  ),

  sku: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[a-zA-Z0-9-_]+$/.test(val), {
      message: "SKU must be alphanumeric (including hyphen and underscore)",
    }),

  images: z
    .any()
    .refine(
      (val) =>
        val &&
        (val instanceof FileList ||
          (Array.isArray(val) && val.every((f) => f instanceof File))),
      {
        message: "At least one image is required",
      }
    ),
});

export const addProductSchema = baseProductSchema;

export const editProductSchema = baseProductSchema.extend({
  id: z.string().min(1, "Product ID is required"),
});
