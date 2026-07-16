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
    // Refresh purchase-related data after returning from Stripe
    queryClient.invalidateQueries({ queryKey: ["my-purchases"] });
    queryClient.invalidateQueries({ queryKey: ["reader-dashboard"] });
  }, [queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-text">Payment successful</h1>
        <p className="mt-2 text-muted">
          Your purchase is complete. The book is now in your library and ready
          to read.
        </p>

        {sessionId && (
          <p className="mt-4 break-all rounded-lg bg-card-alt px-3 py-2 font-mono text-xs text-muted">
            {sessionId.slice(0, 24)}...
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/dashboard/user/purchased-ebooks">
            <Button className="w-full">
              <Library className="h-4 w-4" /> Go to My Library
            </Button>
          </Link>
          <Link href="/browse">
            <Button variant="outline" className="w-full">
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