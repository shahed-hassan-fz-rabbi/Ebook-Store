"use client";

export default function EbookDescription({ ebook }) {
  return (
    <section className="section-padding pt-0">
      <div className="container">

        <div
          className="rounded-3xl p-8 lg:p-10"
          style={{
            background: "var(--white)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              color: "var(--brand)",
            }}
          >
            About this Ebook
          </h2>

          <p
            className="leading-8 text-lg"
            style={{
              color: "var(--muted)",
            }}
          >
            {ebook.description}
          </p>

        </div>

      </div>
    </section>
  );
}