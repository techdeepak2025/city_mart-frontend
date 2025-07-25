import { z } from "zod";

// Field-level schema for role name
const roleNameSchema = z
  .string()
  .trim()
  .min(2, "Role name must be at least 2 characters");

// Base schema reused across add/edit
const baseRoleSchema = z.object({
  name: roleNameSchema,
});

// Export specific schemas
export const addRoleSchema = baseRoleSchema;
export const editRoleSchema = baseRoleSchema;
