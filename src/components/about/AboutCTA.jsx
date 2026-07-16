"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="bg-[#FFF9F5] py-20 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-8 py-14 text-center shadow-2xl"
        >

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
            Join the Community
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Start Your Reading Journey Today
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-orange-100">
            Discover thousands of original ebooks, support talented writers,
            and enjoy a modern reading experience with Fable.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-bold text-orange-600 transition-all hover:scale-105 hover:shadow-lg"
            >
              Browse Ebooks
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center rounded-xl border border-white/40 px-7 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Become a Writer
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}