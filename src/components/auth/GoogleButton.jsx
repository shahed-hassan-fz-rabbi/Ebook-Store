"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function GoogleButton({ label = "Continue with Google" }) {
  const { googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await googleLogin();
    } catch (err) {
      toast.error("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card text-sm font-medium text-text transition-colors hover:bg-card-alt disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      {label}
    </button>
  );
}