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
    <section className="w-full relative overflow-hidden transition-colors duration-300">
      {/* Reduced paddingTop and kept proportional spacing */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "clamp(1.5rem, 4vw, 3rem)",
          paddingBottom: "clamp(4rem, 10vw, 8rem)",
        }}
      >
        {/* Clean Header Block - View all button removed from here */}
        <div className="mb-14 text-left">
          <h2 
            className="text-3xl font-extrabold tracking-tight sm:text-4xl font-[family-name:var(--font-serif)]"
            style={{ color: "var(--brand)" }}
          >
            Featured Ebooks
          </h2>
          <p className="mt-2 text-base font-medium" style={{ color: "var(--muted)" }}>
            Freshly published stories from independent writers.
          </p>
        </div>

        {/* Content Section */}
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
          <>
            {/* Ebook Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <EbookCard key={book.id} ebook={book} />
              ))}
            </div>

            {/* Centered View All Button under the cards */}
            <div className="mt-14 flex justify-center w-full">
              <Link href="/browse" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 text-base font-semibold rounded-xl border-2 transition-all hover:scale-[1.02]"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", color: "var(--brand)" }}
                >
                  View all Ebooks <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}