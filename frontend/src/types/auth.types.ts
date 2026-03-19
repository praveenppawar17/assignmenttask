import type z from "zod";
import type { loginSchema, registerSchema } from "../schemas/authSchema";

export type User = {
  name?: string
  email: string
}
export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null;
}

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;