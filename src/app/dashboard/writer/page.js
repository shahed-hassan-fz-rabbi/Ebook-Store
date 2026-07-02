"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, XCircle, BarChart3, Loader2, TrendingUp, ShieldAlert } from "lucide-react";
import Link from "next/link"; // [Bug 1 Fixed] Added missing Link component import
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function WriterDashboardOverview() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBooks: 0,
    publishedBooks: 0,
    unpublishedBooks: 0,
    totalSales: 0,
    isVerified: false // Default to false until fetched from API
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriterStats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/writer/analytics");
        setStats(res.data?.data || {
          totalBooks: 0,
          publishedBooks: 0,
          unpublishedBooks: 0,
          totalSales: 0,
          isVerified: false
        });
      } catch (err) {
        console.error("Failed to load writer statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWriterStats();
  }, []);

  const cardItems = [
    { label: "Total Ebooks", count: stats.totalBooks, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { label: "Published", count: stats.publishedBooks, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Unpublished", count: stats.unpublishedBooks, icon: XCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
    
    { label: "Total Revenue", count: `$${(stats.totalSales || 0).toFixed(2)}`, icon: BarChart3, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-6">
      
     
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-5%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Creator Workspace ✍️</h1>
          <p className="text-orange-50/90 text-sm font-medium">Track your ebook performance and real-time sales metrics.</p>
        </div>
      </div>

     
      {!loading && !stats.isVerified && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Your writer account is not verified</h3>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">Complete verification payment before publishing ebooks.</p>
            </div>
          </div>
          <Link 
            href="/dashboard/writer/verification"
            className="h-9 px-4 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0"
          >
            Verify Now
          </Link>
        </motion.div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {loading ? <Loader2 size={18} className="animate-spin text-neutral-300" /> : stat.count}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                <Icon size={20} />
              </div>
            </motion.div>
          );
        })}
      </div>

      
      <div className="bg-white dark:bg-neutral-950 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-orange-500" /> Ready to publish something new?
          </h3>
          <p className="text-xs text-neutral-400 font-medium">Add a new creation and make it accessible to global readers instantly.</p>
        </div>

    
        <button 
          onClick={() => {
            if (!stats.isVerified) {
              router.push("/dashboard/writer/verification");
            } else {
              router.push("/dashboard/writer/add-ebook");
            }
          }}
          className="h-10 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center shrink-0"
        >
          Create New Ebook
        </button>
      </div>

    </div>
  );
}