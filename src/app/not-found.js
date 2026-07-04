import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
      <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 shadow-xl max-w-md w-full text-center space-y-6">
        
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <FileQuestion size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-neutral-900 dark:text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Page Not Found</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
}