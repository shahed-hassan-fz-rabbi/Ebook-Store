"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, TrendingUp, DollarSign, PlusCircle } from "lucide-react";

import { getWriterDashboard } from "@/services/writer.service";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function WriterOverviewPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["writer-dashboard"],
    queryFn: getWriterDashboard,
    enabled: user?.role === "writer",
  });

  const stats = data?.data || {};

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Writer Studio
          </h1>
          <p className="mt-2 text-muted">
            Welcome back, {user?.name?.split(" ")[0]}.
          </p>
        </div>

        {user?.isVerified ? (
          <Badge tone="success">Verified Writer</Badge>
        ) : (
          <Badge tone="warning">Not Verified</Badge>
        )}
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
            icon={BookOpen}
            label="Total Ebooks"
            value={stats.totalBooks ?? 0}
            tone="primary"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Sales"
            value={stats.totalSales ?? 0}
            tone="secondary"
          />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={`$${Number(stats.revenue ?? 0).toFixed(2)}`}
            tone="success"
          />
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-card p-8">
        <h2 className="text-lg font-semibold text-text">
          Got a story to tell?
        </h2>
        <p className="mt-1 text-sm text-muted">
          Publish a new ebook and reach readers worldwide.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard/writer/add-ebook">
            <Button>
              <PlusCircle className="h-4 w-4" /> Add New Ebook
            </Button>
          </Link>
          <Link href="/dashboard/writer/manage-ebooks">
            <Button variant="outline">Manage Ebooks</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}