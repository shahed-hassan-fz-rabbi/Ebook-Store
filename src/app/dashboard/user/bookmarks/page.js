"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bookmark, BookOpen, Trash2 } from "lucide-react";

import { getBookmarks, toggleBookmark } from "@/services/bookmark.service";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function BookmarksPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  const { mutate: remove } = useMutation({
    mutationFn: (ebookId) => toggleBookmark(ebookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Removed from bookmarks");
    },
    onError: () => toast.error("Could not remove bookmark."),
  });

  const books = (Array.isArray(data?.data) ? data.data : [])
    .filter((b) => b.ebook)
    .map((b) => ({
      id: b.ebook._id,
      title: b.ebook.title,
      cover: b.ebook.coverImage,
      price: b.ebook.price,
      writer: b.ebook.author?.name || "—",
    }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Bookmarks
        </h1>
        <p className="mt-2 text-muted">Books you saved for later.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Save books you want to read or buy later."
          action={
            <Link href="/browse">
              <Button>Browse Ebooks</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {books.map((b) => (
            <div key={b.id}>
              <Link href={`/ebooks/${b.id}`}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card-alt transition-all hover:border-primary/30">
                  {b.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] items-center justify-center">
                      <BookOpen className="h-10 w-10 text-muted/30" />
                    </div>
                  )}
                </div>
              </Link>

              <h3 className="mt-3 line-clamp-1 font-semibold text-text">
                {b.title}
              </h3>
              <p className="text-sm text-muted">{b.writer}</p>
              <p className="mt-1 font-bold text-text">
                ${Number(b.price).toFixed(2)}
              </p>

              <div className="mt-3 flex gap-2">
                <Link href={`/ebooks/${b.id}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    View
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => remove(b.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}