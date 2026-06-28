"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import RememberForgot from "./RememberForgot";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login");
  };

  return (
    <div className="w-full max-w-lg ">

      <h1
        className="text-5xl font-bold py-2 mx-0"
        style={{
          color: "var(--brand)",
        }}
      >
        Welcome Back
      </h1>

      <p
        className="mt-3 text-lg py-0"
        style={{
          color: "var(--muted)",
        }}
      >
        Sign in to continue your reading journey.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-10"
      >

        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          icon={<Mail size={20} />}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          icon={<Lock size={20} />}
        />

        <RememberForgot />

        <button
          type="submit"
          className="
w-full
h-14
rounded-xl
font-semibold
text-lg
transition-all
duration-300
hover:shadow-xl
hover:-translate-y-0.5
active:scale-95
"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          Sign In
        </button>

      </form>

      <SocialLogin />

      <p
        className="text-center mt-8"
        style={{
          color: "var(--muted)",
        }}
      >
        Don't have an account?

        <Link
          href="/register"
          className="ml-2 font-semibold"
          style={{
            color: "var(--primary)",
          }}
        >
          Create Account
        </Link>

      </p>

    </div>
  );
}