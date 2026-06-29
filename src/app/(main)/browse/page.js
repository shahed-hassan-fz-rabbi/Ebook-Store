"use client";

import { useState } from "react";

import useEBooks from "@/hooks/useEBooks";

import BrowseHero from "@/components/browse/BrowseHero";
import SearchBar from "@/components/browse/SearchBar";
import GenreChips from "@/components/browse/GenreChips";
import SortDropdown from "@/components/browse/SortDropdown";
import EbookGrid from "@/components/browse/EbookGrid";
import Pagination from "@/components/browse/Pagination";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { ebooks, meta, isLoading } = useEBooks({
    search,
    genre,
    sort,
    page,
  });

  return (
    <>
      <BrowseHero />

      <section className="section-padding">
        <div className="container">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <GenreChips
              genre={genre}
              setGenre={setGenre}
            />

            <SortDropdown
              sort={sort}
              setSort={setSort}
            />
          </div>

          <div className="mt-12">
            <EbookGrid
              ebooks={ebooks}
              loading={isLoading}
            />
          </div>

          <div className="mt-10">
            <Pagination
              meta={meta}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </section>
    </>
  );
}