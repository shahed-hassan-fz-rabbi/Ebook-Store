"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, History, Bookmark, User, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী axiosInstance ইম্পোর্ট করুন
import axiosInstance from "@/lib/axios"; 

export default function UserDashboardHome() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchasedBooks = async () => {
    try {
      setLoading(true);
      // রিয়াল ব্যাকএন্ড এপিআই কল
      const res = await axiosInstance.get("/purchases/my");
      // আপনার ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী res.data অথবা res.data.data সেট করুন
      setBooks(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch purchased books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedBooks();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Premium Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-[-5%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-md space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome Back! 👋</h1>
            <p className="text-orange-50/90 text-sm font-medium leading-relaxed">
              Explore your library, track your transaction history, and dive deep into your bookmarked stories.
            </p>
          </div>
        </motion.div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: "Purchased Ebooks", count: books.length, icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
            { label: "Total Transactions", count: books.length, icon: History, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
            { label: "Saved Bookmarks", count: 0, icon: Bookmark, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {loading ? <Loader2 size={20} className="animate-spin text-neutral-300" /> : stat.count}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon size={22} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Purchases Section (Quick Gallery Preview) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Recent Purchases</h2>
            <Link 
              href="/dashboard/user/purchased-ebooks" 
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-0.5 transition-colors"
            >
              View Full Library <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            /* Professional Skeleton Loader Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 p-4 space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-3/4" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-md w-1/2" />
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            /* Friendly Empty State Message */
            <div className="text-center py-16 bg-white dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
              <p className="text-neutral-400 font-medium text-sm">You haven't purchased any ebooks yet.</p>
              <Link 
                href="/browse" 
                className="mt-3 inline-flex items-center h-9 px-4 rounded-xl bg-orange-500 text-white text-xs font-semibold shadow-sm hover:bg-orange-600 transition-colors"
              >
                Browse Ebooks
              </Link>
            </div>
          ) : (
            /* Real Data Gallery View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {books.slice(0, 4).map((book) => (
                <div
                  key={book._id || book.id}
                  className="group bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <Image
                      src={book.ebook?.coverImage || book.coverImage || "/images/placeholder-book.jpg"}
                      alt={book.ebook?.title || book.title || "Ebook"}
                      fill
                      sizes="(max-w-768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {book.ebook?.genre && (
                      <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm tracking-wide uppercase">
                        {book.ebook.genre}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {book.ebook?.title || book.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-medium mt-0.5">
                        By {book.ebook?.writer?.name || book.writer || "Unknown"}
                      </p>
                    </div>
                    
                    <Link
                      href={`/ebooks/${book.ebook?._id || book.ebook?.id || book.id}`}
                      className="w-full h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-neutral-700 dark:text-neutral-300 hover:bg-orange-500 hover:text-white"
                    >
                      Read Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}