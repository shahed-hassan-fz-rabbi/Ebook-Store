"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getMonthlySales, getEbooksByGenre } from "@/services/admin.service";

export default function AnalyticsPage() {
  const { data: salesData } = useQuery({
    queryKey: ["admin-monthly-sales"],
    queryFn: getMonthlySales,
  });

  const { data: genreData } = useQuery({
    queryKey: ["admin-genre"],
    queryFn: getEbooksByGenre,
  });

  const monthly = Array.isArray(salesData?.data) ? salesData.data : [];
  const byGenre = Array.isArray(genreData?.data) ? genreData.data : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Analytics
        </h1>
        <p className="mt-2 text-muted">Revenue and catalog insights.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-text">
            Revenue by Month
          </h2>
          {monthly.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8e2" />
                <XAxis dataKey="month" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-text">
            Ebooks per Genre
          </h2>
          {byGenre.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byGenre}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8e2" />
                <XAxis dataKey="genre" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}