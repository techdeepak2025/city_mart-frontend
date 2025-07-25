import { z } from "zod";

// Shared base schema
const baseSubCategorySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),

  category: z
    .string({ required_error: "Parent category is required" })
    .trim()
    .min(1, "Parent category is required"),

  image: z.any().optional(), // Placeholder to override in specific schemas
});

// Add schema: image must be a File
export const addSubCategorySchema = baseSubCategorySchema.extend({
  image: z
    .instanceof(File, { message: "Image is required" }),
});

// Edit schema: image can be File, null, empty string, or undefined
export const editSubCategorySchema = baseSubCategorySchema.extend({
  image: z
    .union([
      z.instanceof(File),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .optional(),
});
