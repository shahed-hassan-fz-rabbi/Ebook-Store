"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { genres } from "@/config/genres";

export default function Genres() {
  return (
    <section className="w-full relative overflow-hidden transition-colors duration-300">
      
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "clamp(2.5rem, 6vw, 5rem)",
          paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
        }}
      >
        {/* Header Block */}
        <div className="mb-10 max-w-xl text-left">
          <h2
            className="text-3xl mb-4 font-extrabold tracking-tight sm:text-4xl font-[family-name:var(--font-serif)]"
            style={{ color: "var(--brand)" }}
          >
            Explore by Genre
          </h2>
          <p className="mt-3 text-base md:text-[17px] font-medium" style={{ color: "var(--muted)" }}>
            Eight worlds to get lost in. Pick where you want to begin.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="group relative flex min-h-[168px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border px-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    paddingTop: "clamp(1.75rem, 3vw, 2.25rem)",
                    paddingBottom: "clamp(1.75rem, 3vw, 2.25rem)",
                  }}
                >
                 
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: g.color }}
                  />

                 
                  <ArrowUpRight
                    className="absolute right-4 top-4 h-4 w-4 shrink-0 opacity-0 -translate-x-1 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    style={{ color: "var(--primary)" }}
                  />

                  {/* Icon */}
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${g.color}1f`, color: g.color }}
                  >
                    <Icon className="h-6 w-6 shrink-0" />
                  </span>

                  {/* Title + count — centered under the icon */}
                  <div>
                    <span className="text-[16px] font-bold tracking-tight" style={{ color: "var(--brand)" }}>
                      {g.name}
                    </span>
                    {g.count != null && (
                      <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>
                        {g.count} titles
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}