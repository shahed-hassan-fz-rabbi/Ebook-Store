"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BookMarked } from "lucide-react";

import { getAllEbooks } from "@/services/ebook.service";
import { normalizeEbook, unwrapList } from "@/lib/normalize";
import EbookCard from "@/components/ebook/EbookCard";
import SearchBar from "@/components/browse/SearchBar";
import SortDropdown from "@/components/browse/SortDropdown";
import FilterSidebar from "@/components/browse/FilterSidebar";
import Pagination from "@/components/browse/Pagination";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

const LIMIT = 9;

function BrowseContent() {
  const params = useSearchParams();

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [genre, setGenre] = useState(params.get("genre") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debounced, genre, minPrice, maxPrice, sort]);

  const query = { page, limit: LIMIT, sort, status: "published" };
  if (debounced) query.search = debounced;
  if (genre) query.genre = genre;
  if (minPrice) query.minPrice = minPrice;
  if (maxPrice) query.maxPrice = maxPrice;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["browse-ebooks", query],
    queryFn: () => getAllEbooks(query),
  });

  const { items, meta } = unwrapList(data);
  const books = items.map(normalizeEbook);

  const reset = () => {
    setGenre("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
  };

  return (
    <div className="w-full py-14">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-text">
            Browse Ebooks
          </h1>
          <p className="mt-2 text-muted">
            {meta?.total ?? 0} stories waiting to be read.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            genre={genre}
            setGenre={setGenre}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onReset={reset}
          />

          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
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
                title="No ebooks match your filters"
                description="Try adjusting your search or clearing the filters."
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {books.map((book) => (
                    <EbookCard key={book.id} ebook={book} />
                  ))}
                </div>

                <Pagination
                  page={meta?.page ?? page}
                  totalPage={meta?.totalPage ?? 1}
                  onChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={null}>
      <BrowseContent />
    </Suspense>
  );
}