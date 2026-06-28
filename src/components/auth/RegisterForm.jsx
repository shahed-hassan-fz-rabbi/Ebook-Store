"use client";

import Link from "next/link";
import { Mail, Lock, User, BookOpen } from "lucide-react";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register");
  };

  return (
    <div className="w-full max-w-lg">

      <h1
        className="text-5xl font-bold"
        style={{
          color: "var(--brand)",
        }}
      >
        Create Account
      </h1>

      <p
        className="mt-3 text-lg"
        style={{
          color: "var(--muted)",
        }}
      >
        Join thousands of readers and writers.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 mt-10"
      >

        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          icon={<User size={20} />}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={20} />}
        />

        <PasswordField
          label="Password"
          placeholder="Create password"
          icon={<Lock size={20} />}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm password"
          icon={<Lock size={20} />}
        />

        {/* Role */}

        <div>

          <label
            className="block mb-2 font-medium"
            style={{
              color: "var(--brand)",
            }}
          >
            Register As
          </label>

          <select
            className="
            w-full
            h-14
            rounded-xl
            border
            px-4
            outline-none
            "
            style={{
              borderColor: "var(--border)",
            }}
          >
            <option value="user">
              Reader
            </option>

            <option value="writer">
              Writer
            </option>

          </select>

        </div>

        <button
          className="
          w-full
          h-14
          rounded-xl
          text-lg
          font-semibold
          transition
          hover:scale-[1.01]
          active:scale-95
          "
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          Create Account
        </button>

      </form>

      <SocialLogin />

      <p
        className="text-center mt-8"
        style={{
          color: "var(--muted)",
        }}
      >
        Already have an account?

        <Link
          href="/login"
          className="ml-2 font-semibold"
          style={{
            color: "var(--primary)",
          }}
        >
          Login
        </Link>

      </p>

    </div>
  );
}