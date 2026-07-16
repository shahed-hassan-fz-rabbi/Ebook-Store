"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { genres } from "@/config/genres";

export default function Genres() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Explore by Genre
        </h2>
        <p className="mt-3 text-[17px] text-muted">
          Eight worlds to get lost in. Pick where you want to begin.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {genres.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/browse?genre=${encodeURIComponent(g.slug)}`}
                className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_-25px_var(--shadow)]"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ backgroundColor: g.color }}
                />

                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${g.color}1f`, color: g.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="flex items-end justify-between">
                  <span className="text-[15px] font-semibold text-text">
                    {g.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 translate-y-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}