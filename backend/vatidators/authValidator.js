import { z } from "zod";

// تعريف الـ Schema ديال الـ Register
export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 chars"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  role: z.enum(["user", "doctor"], { errorMap: () => ({ message: "Role is required" }) }),
});

// Schema ديال الـ Login (جديدة)
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"), // غير كنتأكدو بلي ماشي خاوي
  });