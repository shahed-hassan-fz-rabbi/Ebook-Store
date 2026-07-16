"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

import { getSingleEbook, updateEbook } from "@/services/ebook.service";
import EbookForm from "@/components/writer/EbookForm";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function EditEbookPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ebook", id],
    queryFn: () => getSingleEbook(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateEbook(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["writer-ebooks"] });
      queryClient.invalidateQueries({ queryKey: ["ebook", id] });
      toast.success("Ebook updated");
      router.push("/dashboard/writer/manage-ebooks");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Could not update ebook.");
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Ebook not found"
        description="This book may have been deleted."
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Edit Ebook
        </h1>
        <p className="mt-2 text-muted">Update your book&apos;s details.</p>
      </div>

      <EbookForm
        initial={data.data}
        onSubmit={mutate}
        submitting={isPending}
        mode="edit"
      />
    </div>
  );
}