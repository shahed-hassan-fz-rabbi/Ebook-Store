"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { genres } from "@/config/genres";
import Button from "@/components/ui/Button";

export default function FilterSidebar({
  genre,
  setGenre,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
}) {
  const hasFilters = genre || minPrice || maxPrice;

  return (
    <aside className="w-full rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-text">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filters
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-muted hover:text-danger"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-text">Genre</p>
        <div className="space-y-1">
          <button
            onClick={() => setGenre("")}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              !genre
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted hover:bg-card-alt hover:text-text"
            }`}
          >
            All Genres
          </button>
          {genres.map((g) => (
            <button
              key={g.slug}
              onClick={() => setGenre(g.slug)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                genre === g.slug
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted hover:bg-card-alt hover:text-text"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-text">Price Range</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none focus:border-primary"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none focus:border-primary"
          />
        </div>
      </div>
    </aside>
  );
}