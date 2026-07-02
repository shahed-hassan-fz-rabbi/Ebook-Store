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
} from "lucide-react";

import axiosInstance from "@/lib/axios";

export default function EbookReaderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/purchases/read/${id}`
        );

        setBook(res.data.data);

        const savedProgress = localStorage.getItem(
          `read-progress-${id}`
        );

        if (savedProgress) {
          setReadingProgress(Number(savedProgress));
        }

        const savedBookmark = localStorage.getItem(
          `bookmarked-${id}`
        );

        if (savedBookmark) {
          setIsBookmarked(JSON.parse(savedBookmark));
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 403) {
          alert("You have not purchased this ebook.");
          router.push("/dashboard/user/purchased-ebooks");
        }

        if (error.response?.status === 404) {
          alert("Ebook not found.");
          router.push("/dashboard/user/purchased-ebooks");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, router]);

  const handleScroll = (e) => {
    const target = e.target;

    const totalHeight =
      target.scrollHeight - target.clientHeight;

    if (totalHeight <= 0) return;

    const progress = Math.round(
      (target.scrollTop / totalHeight) * 100
    );

    setReadingProgress(progress);

    localStorage.setItem(
      `read-progress-${id}`,
      progress
    );
  };

  const zoomIn = () => {
    setFontSize((prev) => Math.min(prev + 2, 28));
  };

  const zoomOut = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  const toggleBookmark = () => {
    const next = !isBookmarked;

    setIsBookmarked(next);

    localStorage.setItem(
      `bookmarked-${id}`,
      JSON.stringify(next)
    );
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          className="animate-spin text-orange-500"
          size={35}
        />
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "bg-neutral-950 text-white"
          : "bg-neutral-50 text-neutral-800"
      }`}
    >
      {/* Header */}

      <header
        className={`sticky top-0 z-50 h-14 flex items-center justify-between px-5 border-b backdrop-blur ${
          isDarkMode
            ? "bg-neutral-950/90 border-neutral-800"
            : "bg-white/90 border-neutral-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-bold text-sm">
              {book.title}
            </h1>

            <p className="text-xs text-neutral-400">
              By {book.author?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={zoomOut}>
            <ZoomOut size={18} />
          </button>

          <button onClick={zoomIn}>
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() =>
              setIsDarkMode(!isDarkMode)
            }
          >
            {isDarkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button onClick={toggleBookmark}>
            <Bookmark
              size={18}
              fill={
                isBookmarked ? "#f97316" : "none"
              }
              className={
                isBookmarked
                  ? "text-orange-500"
                  : ""
              }
            />
          </button>

          <button onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 size={18} />
            ) : (
              <Maximize2 size={18} />
            )}
          </button>
        </div>
      </header>

      {/* Progress */}

      <div className="h-1 bg-neutral-300">
        <motion.div
          className="h-full bg-orange-500"
          animate={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      {/* Reader */}

      <main
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-12 px-5 flex justify-center"
      >
        <article
          className="max-w-3xl w-full leading-9 font-serif"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div className="mb-8 border-b pb-4 flex justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-orange-500">
              {book.genre}
            </span>

            <span className="text-xs text-neutral-400">
              {readingProgress}%
            </span>
          </div>

          <div className="whitespace-pre-wrap">
            {book.content ||
              book.description ||
              "No content available"}
          </div>

          {readingProgress >= 95 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="mt-16 p-8 rounded-2xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 text-center"
            >
              <CheckCircle
                className="mx-auto text-emerald-500"
                size={34}
              />

              <h2 className="mt-3 font-bold">
                Congratulations!
              </h2>

              <p className="text-sm text-neutral-500 mt-2">
                You've completed this ebook.
              </p>
            </motion.div>
          )}
        </article>
      </main>
    </div>
  );
}