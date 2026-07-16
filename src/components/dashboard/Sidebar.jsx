"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LogOut, Home, User } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { dashboardNav } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const links = dashboardNav[user?.role] || [];

  return (
    <div className="flex h-full flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-text">Fable</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-card-alt hover:text-text"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-card-alt px-3 py-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
            {user?.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-primary" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">
              {user?.name}
            </p>
            <p className="truncate text-xs capitalize text-muted">
              {user?.role}
            </p>
          </div>
        </div>

        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card-alt hover:text-text"
        >
          <Home className="h-4 w-4" /> Back to site
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
}