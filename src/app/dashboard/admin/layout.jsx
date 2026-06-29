"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute roles={["admin"]}>
      {children}
    </ProtectedRoute>
  );
}