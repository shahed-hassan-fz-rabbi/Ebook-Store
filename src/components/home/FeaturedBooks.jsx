"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white overflow-hidden h-[470px] animate-pulse">
      <div className="h-[300px] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function FeaturedEbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/ebooks", {
          params: { limit: 4, sort: "-createdAt" },
        });
        setBooks(response.data?.data?.result || response.data?.data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-14">
        <span className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
          ✨ Featured Collection
        </span>
        <h2 className="text-4xl font-extrabold mt-2 tracking-tight text-indigo-900">
          Featured Ebooks
        </h2>
        <p className="text-sm mt-3 max-w-md mx-auto text-gray-500">
          Discover our most popular ebooks handpicked for you.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">No books available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="group rounded-3xl border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col"
            >
              {/* Image block */}
              <div className="relative w-full aspect-[2/3] bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md bg-white/90 text-orange-600">
                  {book.genre || "Fiction"}
                </span>

                <div className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-md bg-white/90 px-2.5 py-1 rounded-full">
                  <Star size={11} fill="#FACC15" color="#FACC15" />
                  <span className="text-[10px] font-bold text-gray-800">
                    {book.averageRating > 0 ? book.averageRating.toFixed(1) : "New"}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/ebooks/${book._id}`}>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold shadow-lg hover:bg-orange-500 hover:text-white transition-all hover:scale-105 active:scale-95">
                      <Eye size={14} />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>

              {/* Body — padding fixed */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <Link href={`/ebooks/${book._id}`}>
                    <h3 className="text-base font-bold text-indigo-900 hover:text-orange-500 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[9px] font-bold text-orange-600 flex-shrink-0">
                      {book.author?.name?.charAt(0) || "F"}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      By {book.author?.name || "Fable Author"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xl font-extrabold text-orange-500">
                    {book.price > 0 ? `$${Number(book.price).toFixed(2)}` : "FREE"}
                  </span>

                  <Link href={`/ebooks/${book._id}`}>
                    <button className="h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 text-white bg-orange-500 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95">
                      <ShoppingCart size={13} />
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-14">
        <Link href="/browse">
          <button className="h-12 px-7 rounded-xl text-sm font-bold border-2 border-orange-500 text-orange-500 transition-all hover:scale-105 active:scale-95 hover:bg-orange-50">
            Explore Collection →
          </button>
        </Link>
      </div>
    </section>
  );
}