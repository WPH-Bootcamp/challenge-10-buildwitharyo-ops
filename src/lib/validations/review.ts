import { z } from "zod";

export const reviewSchema = z.object({
  star: z
    .number()
    .min(1, "Please give a rating")
    .max(5, "Rating cannot exceed 5 stars"),
  comment: z.string().min(1, "Please share your thoughts"),
});

export type ReviewValues = z.infer<typeof reviewSchema>;
