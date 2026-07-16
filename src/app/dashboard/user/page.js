"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Library, Bookmark, ArrowRight } from "lucide-react";

import { getReaderDashboard } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function ReaderOverviewPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["reader-dashboard"],
    queryFn: getReaderDashboard,
    enabled: user?.role === "reader",
  });

  const stats = data?.data || {};

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="mt-2 text-muted">
          Here&apos;s what&apos;s happening with your library.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Library}
            label="Books Owned"
            value={stats.totalPurchasedBooks ?? 0}
            tone="primary"
          />
          <StatCard
            icon={Bookmark}
            label="Bookmarks"
            value={stats.totalBookmarks ?? 0}
            tone="secondary"
          />
          <StatCard
            icon={ShoppingBag}
            label="Total Orders"
            value={stats.totalOrders ?? 0}
            tone="success"
          />
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-card p-8">
        <h2 className="text-lg font-semibold text-text">
          Ready for your next read?
        </h2>
        <p className="mt-1 text-sm text-muted">
          Explore new stories from independent writers.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/browse">
            <Button>
              Browse Ebooks <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard/user/purchased-ebooks">
            <Button variant="outline">My Library</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}