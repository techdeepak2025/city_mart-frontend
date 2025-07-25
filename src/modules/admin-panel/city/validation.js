import { z } from "zod";

// Field-level schema
const cityNameSchema = z
  .string()
  .trim()
  .min(2, "City name must be at least 2 characters");

const stateIdSchema = z
  .string()
  .min(1, "Please select a state");

// Common base schema
const baseCitySchema = z.object({
  name: cityNameSchema,
  state: stateIdSchema,
});

// Export schemas for use in forms
export const addCitySchema = baseCitySchema;
export const editCitySchema = baseCitySchema;
