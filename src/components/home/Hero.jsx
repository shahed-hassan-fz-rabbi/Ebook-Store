"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="w-full py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-powered ebook discovery
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-text lg:text-6xl">
            Discover &amp; Read{" "}
            <span className="text-primary">Original Ebooks</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">
            A modern home for readers and writers. Explore original stories,
            support independent authors, and build a library that travels with
            you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/browse">
              <Button size="lg">
                Browse Ebooks <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                <BookOpen className="h-4 w-4" /> Become a Writer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}