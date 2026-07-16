"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

import Button from "@/components/ui/Button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10">
          <XCircle className="h-9 w-9 text-danger" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-text">Payment cancelled</h1>
        <p className="mt-2 text-muted">
          No charge was made. You can try again whenever you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/browse">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4" /> Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}