"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";

import { getMyPurchases } from "@/services/purchase.service";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PurchaseHistoryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-purchases"],
    queryFn: getMyPurchases,
  });

  const rows = (Array.isArray(data?.data) ? data.data : []).map((p) => ({
    id: p._id,
    title: p.ebook?.title || "—",
    writer: p.writer?.name || "—",
    price: p.price,
    date: p.createdAt,
    status: p.paymentStatus,
  }));

  const columns = [
    { key: "title", label: "Ebook" },
    { key: "writer", label: "Writer" },
    {
      key: "price",
      label: "Amount",
      render: (r) => (
        <span className="font-semibold">${Number(r.price).toFixed(2)}</span>
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
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <Badge tone={r.status === "paid" ? "success" : "warning"}>
          {r.status}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Purchase History
        </h1>
        <p className="mt-2 text-muted">Every book you&apos;ve bought.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState
            icon={ShoppingBag}
            title="No purchases yet"
            description="Books you buy will show up here."
            action={
              <Link href="/browse">
                <Button>Browse Ebooks</Button>
              </Link>
            }
          />
        }
      />
    </div>
  );
}