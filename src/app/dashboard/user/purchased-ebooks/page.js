"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, ExternalLink, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

export default function PurchasedEbooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/purchases/my");
        setBooks(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Error fetching library books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  // [Fix 4] Search by Title, Writer name, and Genre
  const filteredBooks = books.filter((item) => {
    const title = item.ebook?.title || item.title || "";
    const writer = item.writer?.name || item.ebook?.writer?.name || "";
    const genre = item.ebook?.genre || item.genre || "";
    
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              {/* [Fix 5] Dynamic Counter inside Subtitle */}
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">My Library</h1>
              <p className="text-xs text-neutral-400 font-medium">
                {loading ? "Loading books..." : `${books.length} Purchased Books`}
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search title, author, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Content Display Area */}
        {loading ? (
          /* [Fix 10] Skeleton Loader Grid with Shimmer Animation Effect */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 p-4 space-y-4 overflow-hidden relative">
                <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4 dynamic-shimmer" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/2 dynamic-shimmer" />
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          /* [Fix 9] Clean Professional Empty State with Illustration */
          <div className="flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800/60 shadow-sm p-6">
            <div className="text-5xl mb-4 animate-bounce duration-1000">📚</div>
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white">Your Library is Empty</h2>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mt-1">
              Explore our vast collection of original ebooks and starting your collection today.
            </p>
            <Link 
              href="/browse" 
              className="mt-5 inline-flex items-center h-10 px-5 rounded-xl bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          /* Premium Books Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((item) => {
              const bookId = item.ebook?._id || item.ebook?.id || item.id;
              const title = item.ebook?.title || item.title || "Untitled";
              
              // [Fix 1] Populate Check matching Mongoose `.populate("writer", "name photo")`
              const writerName = item.writer?.name || "Unknown Author";
              const coverImage = item.ebook?.coverImage || item.coverImage || "/images/placeholder-book.jpg";
              const genre = item.ebook?.genre || "Ebook";
              
              // [Fix 6] Formatted Purchased Date parsing item.createdAt
              const purchaseDate = item.createdAt 
                ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                : "Recent Date";

              return (
                <motion.div
                  key={item._id || item.id}
                  layout
                  // [Fix 8] Premium Hover effect styling
                  className="group bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
                >
                  {/* Book Cover */}
                  <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <Image
                      src={coverImage}
                      alt={title}
                      fill
                      sizes="(max-w-768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      // [Fix 2] Removed priority={false}
                    />
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm tracking-wide uppercase">
                      {genre}
                    </span>
                  </div>

                  {/* Info Meta */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-medium">By {writerName}</p>
                      
                      {/* [Fix 6] Purchase Timestamp Badge */}
                      <div className="text-[10px] font-semibold text-neutral-400 bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md inline-block">
                        Purchased: <span className="text-neutral-600 dark:text-neutral-300">{purchaseDate}</span>
                      </div>
                    </div>
                    
                    {/* [Fix 7] Double Button Layout Action Group */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* [Fix 3] Future Proof Reader URL Scheme */}
                      <Link
                        href={`/read/${bookId}`}
                        className="h-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm"
                      >
                        Read Now <ExternalLink size={11} />
                      </Link>
                      
                      <Link
                        href={`/ebooks/${bookId}`}
                        className="h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                      >
                        Details <Info size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}