import { useState } from "react";
import { loginSchema } from "../schemas/authSchema";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import type { LoginInput } from "../types/auth.types";
import { loginUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
type FormErrors<T> = Partial<Record<keyof T, string>>;

export default function Login() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors<LoginInput>>({});
  const { loading } = useAppSelector((state) => state.auth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors<LoginInput> = {};

      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof LoginInput;
        fieldErrors[key] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      await dispatch(loginUser(form)).unwrap();

      toast.success("Login successful");
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    // <div className="container-app flex flex-col justify-center  max-w-md">
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-xl font-display font-semibold text-white">
            Login in to your workspace
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage projects and tasks efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && (
            <p className="text-red-400 text-sm ">{errors.email}</p>
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

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
