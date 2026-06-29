"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function UserLayout({
  children,
}) {
  return (
    <ProtectedRoute
      roles={["reader"]}
    >
      {children}
    </ProtectedRoute>
  );
}