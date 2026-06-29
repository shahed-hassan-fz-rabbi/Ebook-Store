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

export default function GenreChips({
  genre,
  setGenre,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {genres.map((item) => (

        <button
          key={item}
          onClick={() =>
            setGenre(
              item === "All"
                ? ""
                : item
            )
          }
          className="px-5 py-2 rounded-full transition"

          style={{
            background:
              genre === item ||
              (genre === "" &&
                item === "All")
                ? "var(--primary)"
                : "#fff",

            color:
              genre === item ||
              (genre === "" &&
                item === "All")
                ? "#fff"
                : "var(--brand)",

            border: "1px solid var(--border)",
          }}
        >
          {item}
        </button>

      ))}

    </div>
  );
}