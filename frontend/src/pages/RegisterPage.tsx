import { useState } from "react";
import { registerSchema } from "../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { RegisterInput } from "../types/auth.types";
import { registerUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/redux";

type FormErrors<T> = Partial<Record<keyof T, string>>;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors<RegisterInput>>({});
const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = registerSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors: FormErrors<RegisterInput> = {};

    result.error.issues.forEach((err) => {
      const key = err.path[0] as keyof RegisterInput;
      fieldErrors[key] = err.message;
    });

    setErrors(fieldErrors);
    toast.error("Please fix the form errors");
    return;
  }

  try {
    await dispatch(registerUser(form)).unwrap();

    toast.success("Registration successful");

    navigate("/login");

  } catch (err) {
    toast.error(err as string);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-xl font-display font-semibold text-white">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start managing your projects today
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          <button className="btn-primary w-full">Register</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
