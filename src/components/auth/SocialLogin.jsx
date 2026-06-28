"use client";

import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (
    <>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <span className="text-sm" style={{ color: "var(--muted)" }}>OR</span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-medium text-sm transition-all"
        style={{
          border: "1.5px solid var(--border)",
          color: "var(--brand)",
          background: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "var(--background)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "white";
        }}
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </>
  );
}