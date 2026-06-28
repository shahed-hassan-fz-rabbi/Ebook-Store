"use client";

import mockEbooks from "@/data/mockEbooks";
import EbookCard from "./EbookCard";

export default function RelatedBooks() {

  return (
    <section className="section-padding">

      <div className="container">

        <h2
          className="text-4xl font-bold mb-12"
          style={{
            color: "var(--brand)",
          }}
        >
          Related Ebooks
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {mockEbooks.slice(0,4).map((book)=>(

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