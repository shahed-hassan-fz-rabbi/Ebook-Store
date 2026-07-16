"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  User, Mail, Calendar, ShieldCheck, AlertCircle, 
  BookOpen, ShoppingBag, DollarSign, Edit, Sparkles, Loader2,
  Rocket, FolderOpen, LineChart, Lock
} from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
export { default } from "@/app/dashboard/user/profile/page";



const ProfileSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse px-4 sm:px-0">
    <div className="rounded-3xl border bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 overflow-hidden">
      <div className="h-32 sm:h-48 w-full bg-neutral-200 dark:bg-neutral-800" />
      <div className="px-4 sm:px-10 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-800 shrink-0" />
        <div className="mt-2 flex-1 w-full flex flex-col items-center sm:items-start space-y-3">
          <div className="h-8 w-3/4 sm:w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="h-4 w-1/2 sm:w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 h-56 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800" />
      <div className="lg:col-span-2 h-56 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800" />
    </div>
  </div>
);

export default function WriterProfilePage() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalBooks: 0, totalSales: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/writer/dashboard");
        const dashboard = res.data?.data;
        
        setStats({
          totalBooks: dashboard?.totalBooks || 0,
          totalSales: dashboard?.totalSales || 0,
          totalRevenue: dashboard?.totalRevenue || 0,
        });
      } catch (error) {
        console.error("Failed to fetch writer stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) 
    : "Recently joined";

  // 4. Role Capitalize (JS-based, safe even if CSS capitalize is removed)
  const formattedRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-full max-w-4xl mx-auto space-y-6 px-4 sm:px-0"
    >
      {/* 1. Header Section - Optimized for Mobile & Desktop */}
      <motion.div 
        variants={itemVariants}
        className="rounded-3xl border overflow-hidden relative shadow-sm"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Cover Image Gradient */}
        <div className="h-32 sm:h-48 w-full bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 dark:from-orange-600 dark:via-orange-700 dark:to-rose-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          {/* ✨ Premium glow layers */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -right-20 -top-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-10 bottom-0 w-52 h-52 rounded-full bg-white/10 blur-3xl" />
        </div>
        
        {/* Profile Info Container */}
        <div className="px-4 sm:px-10 pb-8 flex flex-col sm:flex-row items-center sm:items-end sm:gap-6 -mt-16 sm:-mt-20 relative z-10 text-center sm:text-left">
          
          {/* Avatar */}
          <div 
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 flex items-center justify-center overflow-hidden shrink-0 shadow-xl" 
            style={{ borderColor: "var(--card)", backgroundColor: "var(--background)" }}
          >
            {user?.photo ? (
              <Image 
                src={user.photo} 
                alt={user?.name || "Writer"} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            ) : (
              <User size={64} style={{ color: "var(--muted)" }} />
            )}
          </div>

          {/* User Details & Button */}
          <div className="mt-4 sm:mt-0 flex-1 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
            <div className="space-y-1.5 flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight capitalize truncate max-w-[280px] sm:max-w-md" 
                  style={{ color: "var(--brand)" }}
                >
                  {user?.name}
                </h1>
                
                {/* Verification Badge */}
                {user?.isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 shadow-sm">
                    <ShieldCheck size={14} /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20 shadow-sm">
                    <AlertCircle size={14} /> Unverified
                  </span>
                )}
              </div>
              
              <p className="text-[13px] sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5" style={{ color: "var(--primary)" }}>
                <Sparkles size={14} /> {formattedRole}
              </p>
            </div>

            {/* 2. Edit Profile — disabled / Coming Soon */}
            <motion.button 
              disabled
              title="Coming soon"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm cursor-not-allowed opacity-60"
              style={{ backgroundColor: "var(--muted)", color: "white" }}
            >
              <Lock size={16} /> Coming Soon
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 2. Details & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Personal Details */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 p-6 rounded-3xl border shadow-sm space-y-6"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-lg font-bold border-b pb-3" style={{ color: "var(--brand)", borderColor: "var(--border)" }}>
            Personal Details
          </h3>
          
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border shadow-sm" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>
                <Mail size={18} style={{ color: "var(--primary)" }} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Email Address</p>
                <p className="text-sm font-semibold truncate" style={{ color: "var(--brand)" }}>{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border shadow-sm" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>
                <Calendar size={18} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Joined Fable</p>
                <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>{joinDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lifetime Performance */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 p-6 rounded-3xl border shadow-sm"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-lg font-bold border-b pb-3 mb-6" style={{ color: "var(--brand)", borderColor: "var(--border)" }}>
            Lifetime Performance
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition-all hover:shadow-md bg-orange-50/50 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/10">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-1">
                <BookOpen size={24} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400">{stats.totalBooks}</h4>
              <p className="text-[11px] font-bold uppercase tracking-wider text-orange-500/70 dark:text-orange-400/70">Published Books</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition-all hover:shadow-md bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1">
                <ShoppingBag size={24} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">{stats.totalSales}</h4>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500/70 dark:text-blue-400/70">Total Sales</p>
            </motion.div>

            {/* 3. Revenue Formatting */}
            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition-all hover:shadow-md bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                <DollarSign size={24} />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                ${stats.totalRevenue.toLocaleString()}
              </h4>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-500/70 dark:text-emerald-400/70">Total Revenue</p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* 5. Empty State — no books published yet */}
      {stats.totalBooks === 0 && (
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-3xl border shadow-sm flex flex-col items-center text-center gap-3"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.06), transparent 60%)",
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Rocket size={26} />
          </div>
          <h4 className="text-lg font-black" style={{ color: "var(--brand)" }}>
            🚀 Ready to publish your first ebook?
          </h4>
          <p className="text-sm max-w-md" style={{ color: "var(--muted)" }}>
            Your writer profile is set up. Publish your first ebook to start reaching readers and tracking sales.
          </p>
          <Link
            href="/dashboard/writer/add-ebook"
            className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            <BookOpen size={16} /> Publish Ebook
          </Link>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl border shadow-sm"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-lg font-bold border-b pb-3 mb-5" style={{ color: "var(--brand)", borderColor: "var(--border)" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/dashboard/writer/add-ebook"
            className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Rocket size={18} />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>Publish Ebook</span>
          </Link>

          <Link
            href="/dashboard/writer/manage-ebooks"
            className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FolderOpen size={18} />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>Manage Books</span>
          </Link>

          <Link
            href="/dashboard/writer/sales-history"
            className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <LineChart size={18} />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>Sales History</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}