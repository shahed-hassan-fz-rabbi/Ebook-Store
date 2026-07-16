"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["reader", "writer", "admin"]}>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}