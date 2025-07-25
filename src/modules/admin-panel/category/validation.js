import { z } from "zod";

// 🔸 Shared base schema
const baseCategorySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
});

// 🔸 Add Category: image is required and must be a File
export const addCategorySchema = baseCategorySchema.extend({
  image: z
    .instanceof(File, { message: "Image is required" }),
});

// 🔸 Edit Category: image is optional (can be a File or empty string/null/undefined)
export const editCategorySchema = baseCategorySchema.extend({
  image: z
    .union([
      z.instanceof(File),
      z.string().optional(), 
      z.null(),
      z.undefined(),
    ])
    .optional(),
});
