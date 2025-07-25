import { z } from "zod";

// 🔹 Access scope validation
const accessScopeSchema = z.object({
  type: z.enum(["global", "store", "city"], {
    required_error: "Access type is required",
  }),
  refId: z
    .string()
    .min(1, "Access target is required")
    .optional()
    .or(z.literal("")), // Handles optional refId in case of 'global'
});

// 🔹 Base fields shared between Add & Edit
const baseUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  mobile: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Mobile must be a 10-digit number"),

  role: z
    .string()
    .min(1, "Role is required"),

  avatar: z.any().optional(),

  accessScope: accessScopeSchema,
});

// 🔹 For user creation (password is required)
export const addUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, "Password is required"),
});

// 🔹 For user editing (password optional, but must meet min length if provided)
export const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")), // Allows blank input
});
