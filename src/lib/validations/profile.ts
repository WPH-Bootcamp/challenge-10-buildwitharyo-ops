import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+]+$/, "Phone number may only contain digits"),
});

export type ProfileValues = z.infer<typeof profileSchema>;
