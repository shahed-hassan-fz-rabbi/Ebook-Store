"use client";

const genres = [
  "All",
  "Fiction",
  "Romance",
  "Sci-Fi",
  "Mystery",
  "Fantasy",
  "History",
  "Biography",
];

export default function GenreChips() {
  return (
    <div className="flex flex-wrap gap-3">

      {genres.map((genre, index) => (

        <button
          key={genre}
          className="px-5 py-2 rounded-full font-medium transition-all"
          style={{
            background:
              index === 0
                ? "var(--primary)"
                : "white",

            color:
              index === 0
                ? "white"
                : "var(--brand)",

            border:
              index === 0
                ? "none"
                : "1px solid var(--border)",
          }}
        >
          {genre}
        </button>

      ))}

    </div>
  );
}