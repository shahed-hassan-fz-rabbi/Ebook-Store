"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Library, BookOpen } from "lucide-react";

import { getMyPurchases } from "@/services/purchase.service";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function PurchasedEbooksPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-purchases"],
    queryFn: getMyPurchases,
  });

  const books = (Array.isArray(data?.data) ? data.data : [])
    .filter((p) => p.ebook)
    .map((p) => ({
      id: p.ebook._id,
      title: p.ebook.title,
      cover: p.ebook.coverImage,
      genre: p.ebook.genre,
      writer: p.writer?.name || "—",
    }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          My Library
        </h1>
        <p className="mt-2 text-muted">
          {books.length} {books.length === 1 ? "book" : "books"} ready to read.
        </p>
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
          icon={Library}
          title="Your library is empty"
          description="Books you purchase will appear here, ready to read."
          action={
            <Link href="/browse">
              <Button>Browse Ebooks</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {books.map((b) => (
            <div key={b.id} className="group">
              <Link href={`/read/${b.id}`}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card-alt transition-all group-hover:border-primary/30 group-hover:shadow-md">
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

              <Link href={`/read/${b.id}`} className="mt-3 block">
                <Button size="sm" className="w-full">
                  Read Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}