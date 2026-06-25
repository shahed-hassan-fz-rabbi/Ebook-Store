"use client";

import { GENRES } from "@/constants/genres";

export default function FilterSidebar({
  selectedGenre,
  setSelectedGenre,
  price,
  setPrice,
  clearFilters,
}) {
  return (
    <aside
      className="rounded-3xl border p-6 h-fit sticky top-24"
      style={{
        background: "var(--white)",
        borderColor: "var(--border)",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "var(--brand)" }}
      >
        Filters
      </h2>

      {/* Genre */}

      <div className="mb-8">
        <h3
          className="font-semibold mb-4"
          style={{ color: "var(--brand)" }}
        >
          Genre
        </h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre("All")}
            className="px-4 py-2 rounded-full text-sm"
            style={{
              background:
                selectedGenre === "All"
                  ? "var(--primary)"
                  : "var(--card)",
              color:
                selectedGenre === "All"
                  ? "white"
                  : "var(--brand)",
            }}
          >
            All
          </button>

          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.name)}
              className="px-4 py-2 rounded-full text-sm"
              style={{
                background:
                  selectedGenre === genre.name
                    ? "var(--primary)"
                    : "var(--card)",
                color:
                  selectedGenre === genre.name
                    ? "white"
                    : "var(--brand)",
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}

      <div className="mb-8">
        <h3
          className="font-semibold mb-4"
          style={{ color: "var(--brand)" }}
        >
          Maximum Price
        </h3>

        <input
          type="range"
          min="0"
          max="100"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />

        <p
          className="mt-3 text-sm"
          style={{ color: "var(--muted)" }}
        >
          Up to ${price}
        </p>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-3 rounded-xl font-semibold"
        style={{
          background: "var(--primary)",
          color: "white",
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
}