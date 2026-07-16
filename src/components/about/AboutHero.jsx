"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F5] py-28 dark:bg-[#020617]">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[150px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400"
        >
          <BookOpen size={16} />
          About Fable
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="max-w-5xl text-5xl font-black leading-tight text-slate-900 md:text-7xl dark:text-white"
        >
          Where Stories
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            {" "}
            Come Alive
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400"
        >
          Fable is a modern ebook platform connecting passionate
          readers with talented writers. Discover premium digital
          books, publish your own stories, and build a thriving
          reading community—all in one beautifully crafted experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/browse"
            className="rounded-2xl bg-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Browse Books
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Become a Writer
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Statistics */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            ["20K+", "Readers"],
            ["3500+", "Books"],
            ["700+", "Writers"],
            ["25+", "Countries"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-slate-200 bg-white/70 p-8 backdrop-blur-lg transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h2 className="text-4xl font-black text-orange-500">
                {number}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}