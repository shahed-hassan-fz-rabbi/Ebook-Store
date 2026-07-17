"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Library, ArrowRight, Calendar, Landmark, Receipt } from "lucide-react";

import Button from "@/components/ui/Button";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["my-purchases"] });
    queryClient.invalidateQueries({ queryKey: ["reader-dashboard"] });
  }, [queryClient]);

  // Dynamic date generation for the receipt layout
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-transparent px-4 py-10 transition-colors duration-300">
      <div 
        className="w-full max-w-md rounded-3xl border p-6 md:p-8 text-center shadow-xl transition-all relative overflow-hidden"
        style={{ 
          backgroundColor: "var(--card)", 
          borderColor: "var(--border)" 
        }}
      >
        {/* Top Success Banner with bKash Success Vibe */}
        <div className="flex flex-col items-center">
          <div 
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-inner animate-bounce mb-4"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.12)" }}
          >
            <CheckCircle2 className="h-10 w-10 text-green-500 shrink-0" />
          </div>
          
          <h1 
            className="text-2xl md:text-3xl font-black tracking-tight"
            style={{ color: "var(--brand)" }}
          >
            Payment Successful
          </h1>
          <p 
            className="mt-2 text-sm font-medium px-2" 
            style={{ color: "var(--muted)" }}
          >
            Thank you! Your purchase is complete. The book has been added to your library shelf.
          </p>
        </div>

        {/* Digital Receipt / Invoice Style Section (bKash Payment Vibe) */}
        <div 
          className="mt-6 rounded-2xl border p-5 text-left space-y-3.5 relative"
          style={{ 
            backgroundColor: "var(--background)", 
            borderColor: "var(--border)" 
          }}
        >
          {/* Decorative receipt notch effect at the top */}
          <div className="absolute -top-1.5 left-0 right-0 flex justify-around opacity-20">
            {Array.from({ length: 12 }).map((_, idx) => (
              <span key={idx} className="w-3 h-3 rounded-full bg-current -mt-1" style={{ color: "var(--brand)" }} />
            ))}
          </div>

          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
              <Receipt size={13} style={{ color: "var(--primary)" }} /> Payment Summary
            </span>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
              Completed
            </span>
          </div>

          {/* Transaction Info Rows */}
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm font-semibold shrink-0" style={{ color: "var(--muted)" }}>
              Payment Method:
            </span>
            <span className="text-sm font-bold flex items-center gap-1 text-right" style={{ color: "var(--brand)" }}>
              <Landmark size={14} style={{ color: "var(--primary)" }} /> Online Payment (Stripe)
            </span>
          </div>

          <div className="flex justify-between items-center gap-4">
            <span className="text-sm font-semibold shrink-0" style={{ color: "var(--muted)" }}>
              Time &amp; Date:
            </span>
            <span className="text-sm font-bold flex items-center gap-1 text-right" style={{ color: "var(--brand)" }}>
              <Calendar size={14} style={{ color: "var(--primary)" }} /> {today}
            </span>
          </div>

          {/* Transaction ID Label & Box with Proper Labeling */}
          {sessionId && (
            <div className="pt-2 border-t mt-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "var(--muted)" }}>
                Transaction ID / Session ID
              </span>
              <div 
                className="w-full font-mono text-xs font-bold p-3 rounded-xl border select-all break-all text-center leading-relaxed"
                style={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  color: "var(--primary)"
                }}
              >
                {sessionId}
              </div>
            </div>
          )}
        </div>

        {/* Custom Padded Dynamic Buttons */}
        <div className="mt-8 flex flex-col gap-3.5">
          <Link href="/dashboard/user/purchased-ebooks" className="w-full">
            <Button 
              size="lg"
              className="w-full flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold shadow-md rounded-xl transition-all hover:scale-[1.01]"
            >
              <Library className="h-5 w-5 shrink-0" /> Go to My Library
            </Button>
          </Link>
          
          <Link href="/browse" className="w-full">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold rounded-xl border-2 transition-all hover:scale-[1.01]"
              style={{ 
                borderColor: "var(--border)", 
                backgroundColor: "transparent", 
                color: "var(--brand)" 
              }}
            >
              Keep Browsing <ArrowRight className="h-5 w-5 shrink-0" style={{ color: "var(--primary)" }} />
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