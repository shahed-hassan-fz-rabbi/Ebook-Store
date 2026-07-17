"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="w-full relative overflow-hidden bg-cover bg-center bg-no-repeat transition-colors duration-300"
      style={{
        backgroundImage: "url('/images/hero/hero-bg.jpg')",
        paddingTop: "clamp(3rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 10vw, 9rem)",
      }}
    >
      {/* Whitish overlay for high contrast readability */}
      <div
        className="absolute inset-0 z-10 transition-colors"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      />

      {/* Reliable, consistent left/right margin — matches Navbar/Footer spacing */}
      <div
        className="max-w-7xl mx-auto relative z-20"
        style={{ paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}
      >
        <div className="max-w-2xl flex flex-col items-start text-left">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: "#111827" }}
          >
            Discover &amp; Read{" "}
            <span className="block md:inline" style={{ color: "var(--primary)" }}>
              Original Ebooks
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed font-medium"
            style={{ color: "#374151" }}
          >
            A modern home for readers and writers. Explore original stories,
            support independent authors, and build a library that travels
            with you.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto items-center justify-start">
            <Link href="/browse" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold shadow-lg rounded-xl transition-all hover:scale-[1.02]"
              >
                Browse Ebooks <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 transition-all hover:scale-[1.02] bg-white/50"
                style={{ borderColor: "var(--border)", color: "#111827" }}
              >
                <BookOpen className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} /> Become
                a Writer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}