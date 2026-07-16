"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Users,
  PenTool,
  BookOpen,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  getAdminStats,
  getMonthlySales,
  getEbooksByGenre,
} from "@/services/admin.service";
import StatCard from "@/components/dashboard/StatCard";
import Skeleton from "@/components/ui/Skeleton";

const PIE_COLORS = [
  "#f97316", "#2563eb", "#10b981", "#f59e0b",
  "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9",
];

export default function AdminOverviewPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  const { data: salesData } = useQuery({
    queryKey: ["admin-monthly-sales"],
    queryFn: getMonthlySales,
  });

  const { data: genreData } = useQuery({
    queryKey: ["admin-genre"],
    queryFn: getEbooksByGenre,
  });

  const stats = statsData?.data || {};
  const monthly = Array.isArray(salesData?.data) ? salesData.data : [];
  const byGenre = Array.isArray(genreData?.data) ? genreData.data : [];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Admin Overview
        </h1>
        <p className="mt-2 text-muted">Platform-wide analytics at a glance.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers ?? 0}
            tone="primary"
          />
          <StatCard
            icon={PenTool}
            label="Writers"
            value={stats.totalWriters ?? 0}
            tone="secondary"
          />
          <StatCard
            icon={ShoppingBag}
            label="Ebooks Sold"
            value={stats.totalEbooksSold ?? 0}
            tone="warning"
          />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={`$${Number(stats.totalRevenue ?? 0).toFixed(2)}`}
            tone="success"
          />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Monthly sales line chart */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-3">
          <h2 className="mb-6 text-lg font-semibold text-text">
            Monthly Sales
          </h2>

          {monthly.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              No sales data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8e2" />
                <XAxis dataKey="month" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Genre pie chart */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-text">
            Ebooks by Genre
          </h2>

          {byGenre.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              No ebooks yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={byGenre}
                  dataKey="count"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(e) => e.genre}
                  fontSize={11}
                >
                  {byGenre.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}