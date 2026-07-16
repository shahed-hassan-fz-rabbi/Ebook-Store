"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Users } from "lucide-react";

import {
  getAllUsers,
  blockUser,
  unblockUser,
  changeRole,
} from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ManageUsersPage() {
  const { user: me } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  const { mutate: block } = useMutation({
    mutationFn: (id) => blockUser(id),
    onSuccess: () => {
      invalidate();
      toast.success("User blocked");
    },
    onError: () => toast.error("Action failed."),
  });

  const { mutate: unblock } = useMutation({
    mutationFn: (id) => unblockUser(id),
    onSuccess: () => {
      invalidate();
      toast.success("User unblocked");
    },
    onError: () => toast.error("Action failed."),
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }) => changeRole(id, role),
    onSuccess: () => {
      invalidate();
      toast.success("Role updated");
    },
    onError: () => toast.error("Action failed."),
  });

  const rows = (Array.isArray(data?.data) ? data.data : []).map((u) => ({
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    isBlocked: u.isBlocked,
  }));

  const columns = [
    {
      key: "name",
      label: "User",
      render: (r) => (
        <div>
          <p className="font-semibold text-text">{r.name}</p>
          <p className="text-xs text-muted">{r.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (r) => (
        <select
          value={r.role}
          disabled={r.id === me?._id}
          onChange={(e) => updateRole({ id: r.id, role: e.target.value })}
          className="h-9 rounded-lg border border-border bg-background px-2 text-sm capitalize text-text outline-none focus:border-primary disabled:opacity-50"
        >
          <option value="reader">reader</option>
          <option value="writer">writer</option>
          <option value="admin">admin</option>
        </select>
      ),
    },
    {
      key: "isBlocked",
      label: "Status",
      render: (r) =>
        r.isBlocked ? (
          <Badge tone="danger">Blocked</Badge>
        ) : (
          <Badge tone="success">Active</Badge>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) =>
        r.id === me?._id ? (
          <span className="text-xs text-muted">You</span>
        ) : r.isBlocked ? (
          <Button size="sm" variant="outline" onClick={() => unblock(r.id)}>
            Unblock
          </Button>
        ) : (
          <Button size="sm" variant="danger" onClick={() => block(r.id)}>
            Block
          </Button>
        ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Manage Users
        </h1>
        <p className="mt-2 text-muted">{rows.length} registered users.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState icon={Users} title="No users found" />
        }
      />
    </div>
  );
}