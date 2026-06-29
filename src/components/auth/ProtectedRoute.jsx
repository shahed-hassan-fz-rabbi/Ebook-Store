"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  roles = [],
}) {
  const router = useRouter();

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (
      roles.length &&
      !roles.includes(user.role)
    ) {
      router.replace("/");
    }
  }, [user, loading, router, roles]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  if (
    roles.length &&
    !roles.includes(user.role)
  ) {
    return null;
  }

  return children;
}