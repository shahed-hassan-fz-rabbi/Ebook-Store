"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookMarked } from "lucide-react";

import { getAllEbooks } from "@/services/ebook.service";
import { normalizeEbook, unwrapList } from "@/lib/normalize";
import EbookCard from "@/components/ebook/EbookCard";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function FeaturedBooks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-ebooks"],
    queryFn: () => getAllEbooks({ limit: 8, sort: "-createdAt" }),
  });

  const { items } = unwrapList(data);
  const books = items.map(normalizeEbook);

  return (
    <section className="w-full py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text">
              Featured Ebooks
            </h2>
            <p className="mt-2 text-muted">
              Freshly published stories from independent writers.
            </p>
          </div>

          <Link href="/browse">
            <Button variant="outline" size="md">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            icon={BookMarked}
            title="Couldn't load ebooks"
            description="Something went wrong. Please refresh and try again."
          />
        ) : books.length === 0 ? (
          <EmptyState
            icon={BookMarked}
            title="No ebooks yet"
            description="New stories are on the way — check back soon."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <EbookCard key={book.id} ebook={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}