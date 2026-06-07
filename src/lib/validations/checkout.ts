import { z } from "zod";

export const checkoutSchema = z.object({
  deliveryAddress: z.string().min(5, "Please enter a delivery address"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+]+$/, "Phone number may only contain digits"),
  notes: z.string().optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
