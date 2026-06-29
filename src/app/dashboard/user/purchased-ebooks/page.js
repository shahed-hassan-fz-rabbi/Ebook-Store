"use client";

import { useEffect, useState } from "react";

import EbookCard from "@/components/ebook/EbookCard";

import {
  getPurchasedBooks,
} from "@/services/purchase.service";

export default function PurchasedBooksPage() {

  const [books, setBooks] =
    useState([]);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    const res =
      await getPurchasedBooks();

    setBooks(res.data || []);

  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Purchased Ebooks
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {books.map((item) => (

          <EbookCard
            key={item._id}
            ebook={item.ebook}
          />

        ))}

      </div>

    </div>
  );
}