"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, Home } from "lucide-react";

import Button from "@/components/ui/Button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <XCircle className="h-8 w-8 text-danger" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-text">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          No charge was made to your account. You can try again whenever
          you&apos;re ready.
        </p>

        <div className="mt-8 space-y-3 rounded-2xl bg-card-alt/60 p-5 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Payment Method</span>
            <span className="font-medium text-text">Stripe</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Date</span>
            <span className="font-medium text-text">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Status</span>
            <span className="rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-semibold text-danger">
              Cancelled
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/browse">
            <Button size="lg" className="w-full">
              <ArrowLeft className="h-4 w-4" /> Back to Browse
            </Button>
          </Link>

          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}