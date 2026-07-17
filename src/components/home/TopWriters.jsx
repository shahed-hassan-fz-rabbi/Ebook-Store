"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Award, User, Crown } from "lucide-react";

import { getTopWriters } from "@/services/writer.service";
import { normalizeWriter, unwrapList } from "@/lib/normalize";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

const medal = ["#f59e0b", "#94a3b8", "#b45309"];

export default function TopWriters() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-writers"],
    queryFn: getTopWriters,
  });

  const raw = data?.data;
  const list = Array.isArray(raw) ? raw : unwrapList(data).items;
  const writers = list.map(normalizeWriter).slice(0, 3);

  return (
    <section id="top-writers" className="w-full relative overflow-hidden transition-colors duration-300">
      {/* Tightened top and bottom padding for an optimized layout flow */}
      <div 
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "0.5rem", // Drastically reduced gap below the "View all" button above
          paddingBottom: "clamp(1.5rem, 4vw, 3rem)", // Fixed bottom gap before the Testimonials section
        }}
      >
        {/* Header Block */}
        <div className="mb-12 text-center flex flex-col items-center justify-center">
          <div 
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold border backdrop-blur-sm shadow-sm"
            style={{ backgroundColor: "rgba(249, 115, 22, 0.1)", color: "var(--primary)", borderColor: "var(--border)" }}
          >
            <Award className="h-3.5 w-3.5" /> Leaderboard
          </div>
          <h2 
            className="text-3xl font-extrabold tracking-tight sm:text-4xl font-[family-name:var(--font-serif)]"
            style={{ color: "var(--brand)" }}
          >
            Top Writers
          </h2>
          <p className="mt-3 max-w-md text-base md:text-[17px] font-medium" style={{ color: "var(--muted)" }}>
            The authors readers keep coming back to.
          </p>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : writers.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No sales yet"
            description="Once readers start buying, top writers will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {writers.map((w, i) => (
              <motion.div
                key={w.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                {i === 0 && (
                  <Crown
                    className="absolute left-1/2 top-4 h-5 w-5 -translate-x-1/2"
                    style={{ color: medal[0] }}
                  />
                )}

                <span
                  className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{ backgroundColor: medal[i] }}
                >
                  {i + 1}
                </span>

                <div 
                  className="mx-auto mt-4 mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4"
                  style={{ borderColor: `${medal[i]}40`, backgroundColor: "var(--background)" }}
                >
                  {w.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.photo} alt={w.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-9 w-9" style={{ color: "var(--muted)" }} />
                  )}
                </div>

                <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--brand)" }}>
                  {w.name}
                </h3>

                <div 
                  className="mt-6 flex items-center justify-center gap-6 border-t pt-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <p className="text-xl font-black" style={{ color: "var(--brand)" }}>{w.totalSales}</p>
                    <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Sales</p>
                  </div>
                  <div className="h-8 w-px" style={{ backgroundColor: "var(--border)" }} />
                  <div>
                    <p className="text-xl font-black" style={{ color: "var(--brand)" }}>
                      ${Number(w.totalRevenue).toFixed(0)}
                    </p>
                    <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Revenue</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}