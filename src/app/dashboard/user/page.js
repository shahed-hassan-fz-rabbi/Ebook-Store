"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, History, Bookmark, ArrowRight, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

export default function UserDashboardHome() {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [continueReading, setContinueReading] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchasedBooks = async () => {
    try {
      const res = await axiosInstance.get("/purchases/my");
      setPurchasedBooks(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContinueReading = async () => {
    try {
      const res = await axiosInstance.get("/reading-progress");
      setContinueReading(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      await Promise.all([fetchPurchasedBooks(), fetchContinueReading()]);
      setLoading(false);
    };
    initializeDashboard();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-5%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome Back! 👋</h1>
        <p className="text-orange-50/90 text-sm font-medium mt-1">Ready to dive back into your world of stories?</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Purchased Library", count: purchasedBooks.length, icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
          { label: "Completed Books", count: continueReading.filter(b => b.progress >= 95).length, icon: History, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Active Readings", count: continueReading.filter(b => b.progress > 0 && b.progress < 95).length, icon: Bookmark, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {loading ? <Loader2 size={18} className="animate-spin text-neutral-300" /> : stat.count}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── CONTINUE READING PREMIUM WIDGET ─── */}
      {!loading && continueReading.length > 0 && (
        <div className="bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="text-lg font-bold tracking-tight text-neutral-800 dark:text-white">Continue Reading</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Pick up exactly where you left off.</p>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {continueReading.slice(0, 3).map((item) => {
              const formattedDate = item.lastReadAt 
                ? new Date(item.lastReadAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "Recent";

              return (
                <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-neutral-50/40 dark:hover:bg-neutral-900/10 transition-colors">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-12 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden shrink-0 border dark:border-neutral-800">
                      <Image 
                        src={item.ebook?.coverImage || "/images/placeholder-book.jpg"} 
                        alt={item.ebook?.title || "Book Cover"} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1 min-w-0">
                      <div>
                        <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 truncate">{item.ebook?.title}</h3>
                        <p className="text-xs text-neutral-400 font-medium flex items-center gap-1 mt-0.5">
                          By {item.ebook?.author?.name || "Unknown Author"}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-md">
                        <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-900 flex-1 overflow-hidden border dark:border-neutral-800">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-orange-500 shrink-0">{item.progress}% Completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                      <Calendar size={12} />
                      <span>{formattedDate}</span>
                    </div>
                    <Link href={`/read/${item.ebook?._id || item.ebook?.id}`}>
                      <button className="h-9 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 group">
                        <span>Continue</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Additions Row */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-800 dark:text-white tracking-tight">Recent Additions</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : purchasedBooks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-950 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-400 font-medium text-sm">No books found in your library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {purchasedBooks.slice(0, 4).map((item) => {
              const bookId = item.ebook?._id || item.ebook?.id || item.id;
              return (
                <div key={item._id} className="group bg-white dark:bg-neutral-950 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex flex-col gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative aspect-[3/4] w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden">
                    <Image 
                      src={item.ebook?.coverImage || "/images/placeholder-book.jpg"} 
                      alt="Cover" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-neutral-800 dark:text-neutral-200 truncate group-hover:text-orange-500 transition-colors">
                      {item.ebook?.title || item.title}
                    </h4>
                    <div className="flex gap-2">
                      <Link href={`/read/${bookId}`} className="text-[10px] font-bold text-orange-500 hover:underline">Read</Link>
                      <Link href={`/ebooks/${bookId}`} className="text-[10px] font-bold text-neutral-400 hover:underline">Details</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}