"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validators/register.schema";
import { AuthContext } from "@/context/AuthContext";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const { register: signUp } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("user");
  const [serverError, setServerError] = useState("");

  const {
    register: registerField,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "user" },
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const sanitizedRole = data.role === "user" ? "reader" : data.role;
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        role: sanitizedRole,
      });
      router.push("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 flex flex-col justify-center min-h-[550px]">
      <div className="text-center md:text-left mb-5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--brand)" }}>
          Create Account
        </h1>
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          Join thousands of readers and writers on Fable.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-100 text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <div className="flex flex-col gap-1">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...registerField("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>
          )}
        </div>

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
            placeholder="Create a strong password"
            {...registerField("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter your password"
            {...registerField("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: "var(--muted)" }}>
            I want to join as
          </label>
          <input type="hidden" {...registerField("role")} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "user", label: "Reader" },
              { value: "writer", label: "Writer" },
            ].map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full py-2 px-3 rounded-lg font-medium text-xs transition-all border cursor-pointer"
                  style={{
                    borderColor: isSelected ? "var(--primary)" : "var(--border)",
                    backgroundColor: isSelected ? "rgba(249,115,22,0.05)" : "var(--card)",
                    color: isSelected ? "var(--primary)" : "var(--brand)",
                  }}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
          {errors.role && (
            <p className="text-xs text-red-500 mt-0.5">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all text-white shadow-sm cursor-pointer !mt-5"
          style={{
            backgroundColor: "var(--primary)",
            opacity: isSubmitting ? 0.8 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="relative my-5 text-center text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--muted)" }}>
        <hr style={{ borderColor: "var(--border)" }} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[var(--background)]">
          Or Continue With
        </span>
      </div>

      <GoogleButton />

      <p className="text-center text-xs mt-5" style={{ color: "var(--muted)" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}