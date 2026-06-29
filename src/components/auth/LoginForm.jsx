"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/login.schema";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import RememberForgot from "./RememberForgot";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // TODO: await login(data)
  };

  return (
    <div className="flex flex-col justify-center p-10 lg:p-14">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>
          Welcome Back 👋
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Sign in to continue your reading journey
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
      >
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
            placeholder="Enter your password"
            {...registerField("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <RememberForgot />

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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </motion.button>
      </motion.form>

      <SocialLogin />

      <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold hover:opacity-80"
          style={{ color: "var(--primary)" }}
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}