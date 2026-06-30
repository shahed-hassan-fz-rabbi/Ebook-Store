"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function WriterLayout({ children }) {
  return (
    <ProtectedRoute roles={["writer"]}>
      {children}
    </ProtectedRoute>
  );
}