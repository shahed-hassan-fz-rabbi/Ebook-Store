"use client";

import { useQuery } from "@tanstack/react-query";
import { Receipt } from "lucide-react";

import { getAllPurchases } from "@/services/purchase.service";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

export default function TransactionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: getAllPurchases,
  });

  const rows = (Array.isArray(data?.data) ? data.data : []).map((p) => ({
    id: p._id,
    txn: p.transactionId || p._id,
    buyer: p.buyer?.name || "—",
    ebook: p.ebook?.title || "—",
    writer: p.writer?.name || "—",
    price: p.price,
    status: p.paymentStatus,
    date: p.createdAt,
  }));

  const columns = [
    {
      key: "txn",
      label: "Transaction",
      render: (r) => (
        <span className="font-mono text-xs text-muted">
          {String(r.txn).slice(-12)}
        </span>
      ),
    },
    { key: "buyer", label: "Buyer" },
    { key: "ebook", label: "Ebook" },
    {
      key: "price",
      label: "Amount",
      render: (r) => (
        <span className="font-semibold">${Number(r.price).toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <Badge tone={r.status === "paid" ? "success" : "warning"}>
          {r.status}
        </Badge>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Transactions
        </h1>
        <p className="mt-2 text-muted">All purchases across the platform.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState icon={Receipt} title="No transactions yet" />
        }
      />
    </div>
  );
}