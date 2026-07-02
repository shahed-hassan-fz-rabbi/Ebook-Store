"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Moon, 
  Sun, 
  Bookmark,
  CheckCircle,
  Loader2,
  ShieldAlert
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner"; // Use your project's toast library (e.g., react-hot-toast / sonner)

export default function EbookReaderPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const containerRef = useRef(null);
  const mainViewportRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const initializeReader = async () => {
      try {
        setLoading(true);
        
        const bookRes = await axiosInstance.get(`/purchases/read/${id}`);
        const purchaseData = bookRes.data.data; // Fixed backend response chain mapping
        setBook(purchaseData.ebook);

        const progressRes = await axiosInstance.get(`/reading-progress/${id}`);
        const savedProgress = progressRes.data?.data?.progress || 0;
        setReadingProgress(savedProgress);

        const bookmarksRes = await axiosInstance.get("/bookmarks");
        const userBookmarks = bookmarksRes.data?.data || bookmarksRes.data || [];
        const isAlreadyBookmarked = userBookmarks.some(
          (b) => (b.ebook?._id || b.ebook?.id || b.ebook) === id
        );
        setIsBookmarked(isAlreadyBookmarked);

        // Optimizing scroll positioning layout using requestAnimationFrame instead of setTimeout
        requestAnimationFrame(() => {
          if (mainViewportRef.current && savedProgress > 0) {
            const container = mainViewportRef.current;
            const totalScrollableHeight = container.scrollHeight - container.clientHeight;
            container.scrollTop = (savedProgress / 100) * totalScrollableHeight;
          }
          isInitialRender.current = false;
        });

      } catch (err) {
        console.error("Reader Initialization Error:", err);
        setErrorStatus(err.response?.status || 500);
      } finally {
        setLoading(false);
      }
    };
    
    initializeReader();
  }, [id]);

  const syncProgressToMongoDB = async (progressValue) => {
    try {
      await axiosInstance.post("/reading-progress", {
        ebook: id,
        progress: progressValue
      });
    } catch (err) {
      console.error("Cloud progress sync failed:", err);
    }
  };

  const handleScroll = (e) => {
    if (isInitialRender.current) return; 

    const target = e.target;
    const totalHeight = target.scrollHeight - target.clientHeight;
    
    if (totalHeight > 0) {
      const currentProgress = Math.round((target.scrollTop / totalHeight) * 100);
      setReadingProgress(currentProgress);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        syncProgressToMongoDB(currentProgress);
      }, 2000);
    }
  };

  const toggleBookmark = async () => {
    try {
      const res = await axiosInstance.post("/bookmarks", {
        ebook: id,
        progress: readingProgress
      });
      
      const serverStatus = res.data?.data?.bookmarked ?? res.data?.bookmarked;
      setIsBookmarked(serverStatus);
      
      // Feedback Toast Notification implementation
      if (serverStatus) {
        toast.success("Bookmark Saved");
      } else {
        toast.error("Bookmark Removed");
      }
    } catch (err) {
      console.error("Bookmark synchronization failed:", err);
      toast.error("Failed to update bookmark");
    }
  };

  const zoomIn = () => setFontSize((prev) => Math.min(prev + 2, 28));
  const zoomOut = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-white dark:bg-neutral-950">
        <Loader2 size={32} className="animate-spin text-orange-500" />
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Syncing Secure Workspace...</p>
      </div>
    );
  }

  if (errorStatus === 403) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-neutral-950">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-2xl flex items-center justify-center mb-4 border border-red-100 dark:border-red-900/30">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Access Denied</h2>
        <p className="text-sm text-neutral-400 max-w-sm mt-1">You have not purchased this ebook. Please complete the transaction to access full content.</p>
        <button onClick={() => router.push(`/ebooks/${id}`)} className="mt-5 px-5 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm">Go to Purchase Page</button>
      </div>
    );
  }

  if (errorStatus || !book) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-neutral-950">
        <span className="text-4xl mb-3">⚠️</span>
        <h2 className="text-lg font-bold text-neutral-800 dark:text-white">Configuration Error</h2>
        <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-semibold">Go Back</button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"}`}>
      <header className={`sticky top-0 z-50 h-14 flex items-center justify-between px-5 border-b backdrop-blur ${isDarkMode ? "bg-neutral-950/90 border-neutral-800" : "bg-white/90 border-neutral-200"}`}>
        <div className="flex items-center gap-3 min-w-[50%]">
          <button onClick={() => router.back()} className={`p-2 rounded-xl transition ${isDarkMode ? "hover:bg-neutral-900" : "hover:bg-neutral-100"}`}>
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <h1 className="font-bold text-sm truncate">{book.title}</h1>
            {/* Fallback pattern ensuring book.writer?.name matches Ebook model fields */}
            <p className="text-xs text-neutral-400 truncate">By {book.writer?.name || book.author?.name || "Unknown Author"}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={zoomOut} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900"><ZoomOut size={17} /></button>
          <button onClick={zoomIn} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900"><ZoomIn size={17} /></button>
          <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900">
            {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
          </button>
          <button onClick={toggleBookmark} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <Bookmark size={17} fill={isBookmarked ? "#f97316" : "none"} className={isBookmarked ? "text-orange-500" : ""} />
          </button>
          <button onClick={toggleFullscreen} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900">
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </header>

      <div className="h-1 bg-neutral-300 dark:bg-neutral-800">
        <motion.div className="h-full bg-orange-500" animate={{ width: `${readingProgress}%` }} transition={{ duration: 0.2 }} />
      </div>

      <main ref={mainViewportRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-5 py-10 flex justify-center">
        <article className="max-w-3xl w-full font-serif leading-9" style={{ fontSize: `${fontSize}px` }}>
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-orange-500">{book.genre || "Original Content"}</span>
            <span className="text-xs text-neutral-400 font-semibold">{readingProgress}% Read</span>
          </div>

          <div className="whitespace-pre-wrap leading-loose select-text selection:bg-orange-500/20">
            {book.content || book.description || "No content available."}
          </div>

          {readingProgress >= 95 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-20 rounded-3xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-8 text-center">
              <CheckCircle size={38} className="mx-auto text-emerald-500" />
              <h2 className="mt-4 text-lg font-bold">Congratulations 🎉</h2>
              <p className="text-sm text-neutral-500 mt-2">You've successfully completed this ebook.</p>
              <button onClick={() => router.push("/dashboard/user/purchased-ebooks")} className="mt-6 h-11 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all">Back to Library</button>
            </motion.div>
          )}
        </article>
      </main>
    </div>
  );
}