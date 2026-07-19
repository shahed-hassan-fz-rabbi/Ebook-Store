"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Library, ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["my-purchases"] });
    queryClient.invalidateQueries({ queryKey: ["reader-dashboard"] });
  }, [queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-text">
          Payment Successful
        </h1>

        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Your purchase is complete. The book has been added to your library.
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
            <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
              Completed
            </span>
          </div>

          {sessionId && (
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted">Transaction ID</p>
              <p className="mt-1 truncate font-mono text-xs text-text">
                {sessionId}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/dashboard/user/purchased-ebooks">
            <Button size="lg" className="w-full">
              <Library className="h-4 w-4" /> Go to My Library
            </Button>
          </Link>

          <Link href="/browse">
            <Button variant="ghost" size="lg" className="w-full">
              Keep Browsing <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}