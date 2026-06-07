import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a valid email"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+]+$/, "Phone number may only contain digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
