"use client";

import Link from "next/link";

export default function RememberForgot() {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" className="w-4 h-4 accent-orange-500" />
        <span style={{ color: "var(--muted)" }}>Remember me</span>
      </label>
      <Link
        href="/forgot-password"
        className="text-sm font-medium hover:underline"
        style={{ color: "var(--primary)" }}
      >
        Forgot Password?
      </Link>
    </div>
  );
}