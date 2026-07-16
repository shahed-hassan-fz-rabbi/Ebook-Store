"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/ui/Spinner";

export default function AuthCallbackPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role === "admin") router.replace("/dashboard/admin");
    else if (user.role === "writer") router.replace("/dashboard/writer");
    else router.replace("/");
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
        <BookOpen className="h-7 w-7" />
      </span>
      <Spinner size={28} />
      <p className="text-sm text-muted">Signing you in...</p>
    </div>
  );
}