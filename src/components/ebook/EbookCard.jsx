"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function EbookCard({ ebook }) {
  const router = useRouter();

  const handleBuy = (e) => {
    e.preventDefault();
    router.push(`/ebooks/${ebook.id}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/ebooks/${ebook.id}`}>
        <figure className="aspect-[3/4] overflow-hidden bg-card-alt">
          {ebook.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ebook.cover}
              alt={ebook.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="h-10 w-10 text-muted/30" />
            </div>
          )}
        </figure>
      </Link>

      <div className="p-5">
        <h2 className="line-clamp-1 text-lg font-semibold text-text">
          {ebook.title}
        </h2>

        <p className="mt-1 text-sm text-muted">{ebook.author.name}</p>

        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {ebook.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-text">
            ${ebook.price.toFixed(2)}
          </span>

          <button
            onClick={handleBuy}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}