import { z } from "zod";

const stateName = z
  .string()
  .trim()
  .min(2, "State name must be at least 2 characters");

const baseStateSchema = z.object({
  name: stateName,
});

export const addStateSchema = baseStateSchema;
export const editStateSchema = baseStateSchema;
