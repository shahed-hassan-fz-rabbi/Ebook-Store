"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookOpen, Pencil, Trash2, PlusCircle } from "lucide-react";

import { getAllEbooks, deleteEbook, updateEbook } from "@/services/ebook.service";
import { unwrapList } from "@/lib/normalize";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/dashboard/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ManageEbooksPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["writer-ebooks", user?._id],
    queryFn: () => getAllEbooks({ author: user._id, limit: 100 }),
    enabled: !!user?._id,
  });

  const { items } = unwrapList(data);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["writer-ebooks"] });
    queryClient.invalidateQueries({ queryKey: ["writer-dashboard"] });
  };

  const { mutate: remove } = useMutation({
    mutationFn: (id) => deleteEbook(id),
    onSuccess: () => {
      invalidate();
      toast.success("Ebook deleted");
    },
    onError: () => toast.error("Could not delete ebook."),
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, status }) => updateEbook(id, { status }),
    onSuccess: () => {
      invalidate();
      toast.success("Status updated");
    },
    onError: () => toast.error("Could not update status."),
  });

  const handleDelete = (id, title) => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      remove(id);
    }
  };

  const rows = items.map((b) => ({
    id: b._id,
    title: b.title,
    genre: b.genre,
    price: b.price,
    status: b.status,
    totalSales: b.totalSales,
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
          <div className="min-w-0">
            <p className="truncate font-semibold text-text">{r.title}</p>
            <p className="text-xs text-muted">{r.genre}</p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (r) => (
        <span className="font-semibold">${Number(r.price).toFixed(2)}</span>
      ),
    },
    { key: "totalSales", label: "Sales" },
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
        <div className="flex gap-2">
          <Link href={`/dashboard/writer/edit-ebook/${r.id}`}>
            <Button size="sm" variant="outline">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(r.id, r.title)}
          >
            <Trash2 className="h-3.5 w-3.5 text-danger" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Manage Ebooks
          </h1>
          <p className="mt-2 text-muted">
            {rows.length} {rows.length === 1 ? "book" : "books"} published.
          </p>
        </div>

        <Link href="/dashboard/writer/add-ebook">
          <Button>
            <PlusCircle className="h-4 w-4" /> Add Ebook
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        empty={
          <EmptyState
            icon={BookOpen}
            title="No ebooks yet"
            description="Publish your first story and start earning."
            action={
              <Link href="/dashboard/writer/add-ebook">
                <Button>Add Your First Ebook</Button>
              </Link>
            }
          />
        }
      />
    </div>
  );
}