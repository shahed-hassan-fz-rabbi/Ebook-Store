"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";

import { getWriterSalesHistory } from "@/services/purchase.service";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";

export default function SalesHistoryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["writer-sales"],
    queryFn: getWriterSalesHistory,
  });

  const list = Array.isArray(data?.data) ? data.data : [];

  const rows = list.map((s) => ({
    id: s._id,
    title: s.ebook?.title || "—",
    buyer: s.buyer?.name || "—",
    email: s.buyer?.email || "—",
    price: s.price,
    date: s.createdAt,
  }));

  const total = rows.reduce((sum, r) => sum + Number(r.price || 0), 0);

  const columns = [
    { key: "title", label: "Ebook" },
    {
      key: "buyer",
      label: "Buyer",
      render: (r) => (
        <div>
          <p className="font-medium text-text">{r.buyer}</p>
          <p className="text-xs text-muted">{r.email}</p>
        </div>
      ),
    },
    {
      key: "price",
      label: "Amount",
      render: (r) => (
        <span className="font-semibold text-success">
          ${Number(r.price).toFixed(2)}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (r) =>
        r.date
          ? new Date(r.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Sales History
          </h1>
          <p className="mt-2 text-muted">Every sale you&apos;ve made.</p>
        </div>

        <div className="rounded-xl border border-border bg-card px-6 py-3">
          <p className="text-xs text-muted">Total Earned</p>
          <p className="text-2xl font-bold text-text">${total.toFixed(2)}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState
            icon={TrendingUp}
            title="No sales yet"
            description="When readers buy your books, sales will appear here."
          />
        }
      />
    </div>
  );
}