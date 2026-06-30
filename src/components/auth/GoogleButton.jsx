"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-medium text-sm transition-all"
      style={{
        border: "1.5px solid var(--border)",
        color: "var(--brand)",
        background: "white",
      }}
    >
      <FcGoogle size={20} />
      {loading ? "Redirecting..." : "Continue with Google"}
    </button>
  );
}