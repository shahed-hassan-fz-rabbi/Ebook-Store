"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/login.schema";
import { AuthContext } from "@/context/AuthContext";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import RememberForgot from "./RememberForgot";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await login(data);
      router.push("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col justify-center min-h-[500px]">
      <div className="text-center md:text-left mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--brand)" }}>
          Welcome Back
        </h1>
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          Sign in to continue your reading journey.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-100 text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            {...registerField("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            {...registerField("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
          )}
        </div>

        <div className="pt-1">
          <RememberForgot />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all text-white shadow-sm cursor-pointer mt-2"
          style={{
            backgroundColor: "var(--primary)",
            opacity: isSubmitting ? 0.8 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="relative my-6 text-center text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--muted)" }}>
        <hr style={{ borderColor: "var(--border)" }} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[var(--background)]">
          Or Continue With
        </span>
      </div>

      <GoogleButton />

      <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}