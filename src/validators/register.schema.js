import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z
      .string()
      .min(1, "Please enter your email.")
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
    role: z.enum(["user", "writer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });