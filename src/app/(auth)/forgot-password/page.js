"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Password reset isn't available yet."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      }
    >
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-text">
          Need help getting back in?
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          Self-service password reset is coming soon. In the meantime, reach out
          and we&apos;ll help you recover your account.
        </p>

        <Link href="/contact" className="mt-6 block">
          <Button className="w-full">Contact Support</Button>
        </Link>
      </div>
    </AuthShell>
  );
}