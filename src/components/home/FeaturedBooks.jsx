"use client";

import EbookCard from "@/components/ebook/EbookCard";
import useEBooks from "@/hooks/useEBooks";

export default function FeaturedBooks() {
  const { ebooks, isLoading } = useEBooks();

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="text-2xl font-bold">
            Loading Featured Books...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold"
            style={{ color: "var(--brand)" }}
          >
            Featured Ebooks
          </h2>

          <p
            className="mt-4"
            style={{ color: "var(--muted)" }}
          >
            Discover our most popular ebooks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.slice(0, 6).map((book) => (
            <EbookCard
              key={book._id}
              ebook={book}
            />
          ))}
        </div>
      </div>
    </section>
  );
}