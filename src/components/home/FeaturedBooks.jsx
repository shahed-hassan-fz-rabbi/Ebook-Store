"use client";

import mockEbooks from "@/data/mockEbooks";
import EbookCard from "@/components/ebook/EbookCard";

export default function FeaturedBooks() {
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
          {mockEbooks.map((book) => (
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