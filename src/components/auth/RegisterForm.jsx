"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validators/register.schema";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState("user");

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
    console.log("Register data:", data);
    // TODO: await registerUser(data)
  };

  return (
    <div className="flex flex-col justify-center p-10 lg:p-14">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>
          Create Account 🚀
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Join thousands of readers and writers
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
      >
        {/* Name */}
        <div>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...registerField("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...registerField("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <PasswordField
            label="Password"
            placeholder="Create a password"
            {...registerField("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            {...registerField("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            className="text-sm font-medium block mb-2"
            style={{ color: "var(--brand)" }}
          >
            I want to join as
          </label>

          {/* Hidden input for RHF */}
          <input type="hidden" {...registerField("role")} />

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "user", label: "📖 Reader" },
              { value: "writer", label: "✍️ Writer" },
            ].map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => handleRoleSelect(role.value)}
                className="flex items-center gap-2 p-3 rounded-xl transition-all"
                style={{
                  border:
                    selectedRole === role.value
                      ? "1.5px solid var(--primary)"
                      : "1.5px solid var(--border)",
                  background:
                    selectedRole === role.value
                      ? "rgba(249,115,22,0.05)"
                      : "white",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--brand)" }}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          {errors.role && (
            <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            color: "white",
            boxShadow: "0 4px 15px rgba(249,115,22,0.35)",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </motion.button>
      </motion.form>

      <SocialLogin />

      <p className="mt-4 text-center text-sm" style={{ color: "var(--muted)" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold hover:opacity-80"
          style={{ color: "var(--primary)" }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}