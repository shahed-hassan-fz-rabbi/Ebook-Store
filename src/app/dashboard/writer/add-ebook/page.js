"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createEbook } from "@/services/ebook.service";
import EbookForm from "@/components/writer/EbookForm";

export default function AddEbookPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => createEbook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["writer-ebooks"] });
      queryClient.invalidateQueries({ queryKey: ["writer-dashboard"] });
      toast.success("Ebook published successfully");
      router.push("/dashboard/writer/manage-ebooks");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Could not publish ebook."
      );
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Add New Ebook
        </h1>
        <p className="mt-2 text-muted">
          Fill in the details and publish your story.
        </p>
      </div>

      <EbookForm onSubmit={mutate} submitting={isPending} mode="create" />
    </div>
  );
}