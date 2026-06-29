"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search ebooks..."
        className="w-full rounded-2xl py-4 pl-14 pr-5 border bg-white shadow-sm outline-none focus:ring-4"
        style={{
          borderColor: "var(--border)",
        }}
      />

    </div>
  );
}