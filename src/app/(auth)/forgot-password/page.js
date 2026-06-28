import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--brand)",
          }}
        >
          Forgot Password
        </h1>

        <p
          className="mt-3 text-base leading-7"
          style={{
            color: "var(--muted)",
          }}
        >
          Enter your email address and we'll send you a password reset link.
        </p>

        <form className="mt-10 space-y-6">

          {/* Email */}

          <div>

            <label
              className="block mb-2 font-medium"
              style={{
                color: "var(--brand)",
              }}
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: "var(--muted)",
                }}
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  h-14
                  rounded-xl
                  border
                  pl-12
                  pr-4
                  outline-none
                  transition
                  focus:ring-2
                "
                style={{
                  borderColor: "var(--border)",
                }}
              />

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            className="
              w-full
              h-14
              rounded-xl
              text-lg
              font-semibold
              transition
              hover:opacity-90
              active:scale-95
            "
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            Send Reset Link
          </button>

        </form>

        {/* Back to Login */}

        <div className="mt-8 text-center">

          <Link
            href="/login"
            className="
              inline-flex
              items-center
              gap-2
              font-medium
              transition
              hover:opacity-80
            "
            style={{
              color: "var(--primary)",
            }}
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

        </div>

      </div>
    </AuthLayout>
  );
}