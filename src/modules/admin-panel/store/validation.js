import { z } from "zod";

// Field-level validations
const storeNumberSchema = z
  .string()
  .trim()
  .min(1, "Store number is required");

const stateSchema = z
  .string()
  .min(1, "State is required");

const citySchema = z
  .string()
  .min(1, "City is required");

const addressSchema = z
  .string()
  .trim()
  .min(1, "Address is required");

const pincodeSchema = z
  .string()
  .length(6, "Pincode must be exactly 6 digits")
  .regex(/^\d{6}$/, "Pincode must be a 6-digit number");

// Base schema shared across add/edit forms
const baseStoreSchema = z.object({
  storeNumber: storeNumberSchema,
  state: stateSchema,
  city: citySchema,
  address: addressSchema,
  pincode: pincodeSchema,
});

// Specific exports for Add and Edit use
export const addStoreSchema = baseStoreSchema;
export const editStoreSchema = baseStoreSchema;
