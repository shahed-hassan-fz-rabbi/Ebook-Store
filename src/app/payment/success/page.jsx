"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white dark:bg-neutral-950 p-8 rounded-3xl shadow-2xl shadow-emerald-500/5 border border-neutral-100 dark:border-neutral-800 text-center relative overflow-hidden"
      >
        {/* Subtle Background Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 dark:bg-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative z-10"
        >
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </motion.div>

        {/* Typography */}
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mb-2 tracking-tight relative z-10">
          Payment Successful!
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-8 relative z-10">
          Thank you for your purchase. Your ebook has been successfully added to your digital library. Happy reading!
        </p>

        {/* Transaction Receipt Box (Fetches from URL) */}
        {sessionId && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-100 dark:border-neutral-800/80 text-left flex flex-col gap-1 relative z-10"
          >
            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Transaction ID
            </p>
            <p className="text-xs font-mono text-neutral-700 dark:text-neutral-300 truncate">
              {sessionId}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3 relative z-10"
        >
          <Link
            href="/dashboard/reader/library"
            className="w-full flex items-center justify-center gap-2 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg group"
          >
            <BookOpen size={18} />
            Go to My Library
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/browse"
            className="w-full flex items-center justify-center gap-2 h-12 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl font-bold text-sm transition-all"
          >
            Browse More Books
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}