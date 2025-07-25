import { z } from "zod";

// Shared unit validation
const unitSchema = z
  .string({ required_error: "Unit is required" })
  .min(1, "Unit is required");

// Shared base schema
const baseMeasurementSchema = z.object({
  name: z
    .string({ required_error: "Measurement name is required" })
    .min(1, "Measurement name is required"),
  units: z
    .array(unitSchema)
    .min(1, "At least one unit is required"),
});

// Add schema (no _id required)
export const addMeasurementSchema = baseMeasurementSchema;

// Edit schema (requires _id)
export const editMeasurementSchema = baseMeasurementSchema.extend({
  _id: z
    .string({ required_error: "ID is required" })
    .min(1, "ID is required"),
});
