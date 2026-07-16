"use client";

import { BadgeCheck, ShieldAlert, Mail } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function VerificationPage() {
  const { user } = useAuth();

  const verified = user?.isVerified;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Writer Verification
        </h1>
        <p className="mt-2 text-muted">
          Verified writers appear on the Top Writers leaderboard.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-border bg-card p-8">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            verified ? "bg-success/10" : "bg-warning/10"
          }`}
        >
          {verified ? (
            <BadgeCheck className="h-7 w-7 text-success" />
          ) : (
            <ShieldAlert className="h-7 w-7 text-warning" />
          )}
        </span>

        <h2 className="mt-5 text-xl font-bold text-text">
          {verified ? "You're verified" : "Not verified yet"}
        </h2>

        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {verified
            ? "Your writer account is verified. Your books are eligible to appear on the Top Writers leaderboard."
            : "Your account hasn't been verified yet. You can still publish and sell ebooks, but verified writers get featured placement on the homepage."}
        </p>

        {!verified && (
          <div className="mt-6 rounded-xl border border-border bg-background p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-text">
              <Mail className="h-4 w-4 text-primary" /> How to get verified
            </p>
            <p className="mt-2 text-sm text-muted">
              Verification is currently handled manually. Contact support and
              we&apos;ll review your account.
            </p>

            <Link href="/contact" className="mt-4 block">
              <Button>Contact Support</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}