"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, Search, ExternalLink, Trash2, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/bookmarks");
      setBookmarks(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const toggleRemoveBookmark = async (bookId) => {
    try {
      await axiosInstance.post("/bookmarks", { ebook: bookId });
      setBookmarks((prev) => prev.filter((item) => {
        const id = item.ebook?._id || item.ebook?.id || item.id;
        return id !== bookId;
      }));
    } catch (err) {
      console.error("Error removing bookmark:", err);
    }
  };

  const filteredBookmarks = bookmarks.filter((item) => {
    const title = item.ebook?.title || "";
    const author = item.ebook?.author?.name || "";
    const genre = item.ebook?.genre || "";
    
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Bookmark size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Bookmarks</h1>
              <p className="text-xs text-neutral-400 font-medium">
                {loading ? "Loading bookmarks..." : `${bookmarks.length} Saved Ebooks`}
              </p>
            </div>
          </div>

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 p-4 space-y-4 overflow-hidden relative">
                <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800/60 shadow-sm p-6">
            <div className="text-5xl mb-4">🔖</div>
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white">No Bookmarks Saved</h2>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mt-1">You haven't bookmarked any books yet. Keep track of stories you love while exploring.</p>
            <Link href="/browse" className="mt-5 inline-flex items-center h-10 px-5 rounded-xl bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 transition-colors">Explore Browse Page</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBookmarks.map((item) => {
              const bookId = item.ebook?._id || item.ebook?.id || item.id;
              const title = item.ebook?.title || "Untitled";
              const writerName = item.ebook?.author?.name || "Unknown Author";
              const coverImage = item.ebook?.coverImage || "/images/placeholder-book.jpg";
              const genre = item.ebook?.genre || "Ebook";

              return (
                <motion.div
                  key={item._id || item.id}
                  layout
                  className="group bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] relative"
                >
                  <button 
                    onClick={() => toggleRemoveBookmark(bookId)}
                    className="absolute top-3 left-3 z-20 w-8 h-8 rounded-lg bg-black/40 hover:bg-red-500/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <Image src={coverImage} alt={title} fill sizes="(max-w-768px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm tracking-wide uppercase">{genre}</span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-1 group-hover:text-orange-500 transition-colors">{title}</h3>
                      <p className="text-xs text-neutral-400 font-medium">By {writerName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/read/${bookId}`} className="h-9 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm">
                        Read <ExternalLink size={11} />
                      </Link>
                      <Link href={`/ebooks/${bookId}`} className="h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-xs font-semibold flex items-center justify-center gap-1 transition-all">
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