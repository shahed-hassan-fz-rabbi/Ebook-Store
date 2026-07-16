"use client";

import { User, Mail, BadgeCheck, Shield } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import Badge from "@/components/ui/Badge";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const fields = [
    { icon: User, label: "Full Name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    {
      icon: Shield,
      label: "Role",
      value: <span className="capitalize">{user.role}</span>,
    },
    {
      icon: BadgeCheck,
      label: "Account Status",
      value: user.isBlocked ? (
        <Badge tone="danger">Blocked</Badge>
      ) : (
        <Badge tone="success">Active</Badge>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">Profile</h1>
        <p className="mt-2 text-muted">Your account details.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-5 border-b border-border pb-8">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10">
            {user.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </span>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-text">
              {user.name}
            </h2>
            <p className="truncate text-sm text-muted">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label}>
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                  <Icon className="h-3.5 w-3.5" /> {f.label}
                </p>
                <div className="mt-1.5 text-[15px] font-semibold text-text">
                  {f.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}