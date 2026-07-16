"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookOpen, Trash2 } from "lucide-react";

import { getAllEbooks, deleteEbook, updateEbook } from "@/services/ebook.service";
import { unwrapList } from "@/lib/normalize";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function AdminManageEbooksPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-ebooks"],
    queryFn: () => getAllEbooks({ limit: 100 }),
  });

  const { items } = unwrapList(data);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-ebooks"] });

  const { mutate: remove } = useMutation({
    mutationFn: (id) => deleteEbook(id),
    onSuccess: () => {
      invalidate();
      toast.success("Ebook deleted");
    },
    onError: () => toast.error("Could not delete."),
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, status }) => updateEbook(id, { status }),
    onSuccess: () => {
      invalidate();
      toast.success("Status updated");
    },
    onError: () => toast.error("Could not update."),
  });

  const handleDelete = (id, title) => {
    if (confirm(`Delete "${title}"?`)) remove(id);
  };

  const rows = items.map((b) => ({
    id: b._id,
    title: b.title,
    writer: b.author?.name || "—",
    price: b.price,
    status: b.status,
    cover: b.coverImage,
  }));

  const columns = [
    {
      key: "title",
      label: "Ebook",
      render: (r) => (
        <div className="flex items-center gap-3">
          {r.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={r.cover}
              alt={r.title}
              className="h-12 w-9 shrink-0 rounded-md object-cover"
            />
          )}
          <p className="font-semibold text-text">{r.title}</p>
        </div>
      ),
    },
    { key: "writer", label: "Writer" },
    {
      key: "price",
      label: "Price",
      render: (r) => `$${Number(r.price).toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <button
          onClick={() =>
            toggleStatus({
              id: r.id,
              status: r.status === "published" ? "unpublished" : "published",
            })
          }
        >
          <Badge tone={r.status === "published" ? "success" : "muted"}>
            {r.status}
          </Badge>
        </button>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDelete(r.id, r.title)}
        >
          <Trash2 className="h-3.5 w-3.5 text-danger" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Manage Ebooks
        </h1>
        <p className="mt-2 text-muted">{rows.length} ebooks on the platform.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={<EmptyState icon={BookOpen} title="No ebooks found" />}
      />
    </div>
  );
}