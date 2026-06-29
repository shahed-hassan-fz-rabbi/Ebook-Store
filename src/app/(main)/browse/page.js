"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import useEBooks from "@/hooks/useEBooks";
import EbookCard from "@/components/ebook/EbookCard";
import BrowseHero from "@/components/browse/BrowseHero";
import SearchBar from "@/components/browse/SearchBar";
import GenreChips from "@/components/browse/GenreChips";
import SortDropdown from "@/components/browse/SortDropdown";
import Pagination from "@/components/browse/Pagination";

const LIMIT = 9;

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const params = {
    page,
    limit: LIMIT,
    sort,
    ...(search && { search }),
    ...(selectedGenre !== "All" && { genre: selectedGenre }),
  };

  const { ebooks, meta, isLoading } = useEBooks(params);

  const totalPages = Math.ceil((meta?.total || 0) / LIMIT);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
    setPage(1);
  };

  return (
    <>
      <BrowseHero />

      <section className="section-padding">
        <div className="container">

          {/* Search */}
          <SearchBar search={search} setSearch={handleSearch} />

          {/* Genre + Sort */}
          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <GenreChips selected={selectedGenre} setSelected={handleGenreChange} />
            <SortDropdown sort={sort} setSort={handleSort} />
          </div>

          {/* Result count */}
          <div className="mt-8 mb-4">
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              Showing{" "}
              <span className="font-semibold" style={{ color: "var(--brand)" }}>
                {meta?.total || 0}
              </span>{" "}
              results
            </span>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl animate-pulse"
                  style={{ backgroundColor: "var(--card)", height: "380px" }}
                />
              ))}
            </div>
          ) : ebooks.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-3xl"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <BookOpen size={52} style={{ color: "var(--muted)" }} />
              <h3 className="mt-4 font-semibold text-lg" style={{ color: "var(--brand)" }}>
                No ebooks found
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedGenre("All");
                  setSort("-createdAt");
                  setPage(1);
                }}
                className="mt-6 px-6 py-2.5 rounded-xl font-medium text-sm"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {ebooks.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EbookCard ebook={book} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}

        </div>
      </section>
    </>
  );
}