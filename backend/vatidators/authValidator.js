import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 chars"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  role: z.enum(["user", "doctor"], { errorMap: () => ({ message: "Role is required" }) }),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });