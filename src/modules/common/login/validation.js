import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d{10}$/, "Mobile number must contain only digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
