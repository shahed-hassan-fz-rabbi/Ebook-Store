"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Fable Application Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
      <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-xl max-w-md w-full text-center space-y-6">
        
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Something went wrong!</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            An unexpected error has occurred in the application. We've logged the issue and are looking into it.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            <RefreshCcw size={16} /> Try Again
          </button>
          
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-sm font-bold transition-all"
          >
            <Home size={16} /> Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}