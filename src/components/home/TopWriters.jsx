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
    <section id="top-writers" className="bg-card-alt/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[13px] font-semibold text-primary">
            <Award className="h-3.5 w-3.5" /> Leaderboard
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Top Writers
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[17px] text-muted">
            The authors readers keep coming back to.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : writers.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No sales yet"
            description="Once readers start buying, top writers will appear here."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {writers.map((w, i) => (
              <motion.div
                key={w.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_var(--shadow)]"
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

                <div className="mx-auto mt-4 mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 bg-card-alt"
                  style={{ borderColor: `${medal[i]}40` }}
                >
                  {w.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.photo} alt={w.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-9 w-9 text-muted" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-text">{w.name}</h3>

                <div className="mt-4 flex items-center justify-center gap-6 border-t border-border pt-4">
                  <div>
                    <p className="text-xl font-bold text-text">{w.totalSales}</p>
                    <p className="text-xs text-muted">Sales</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-xl font-bold text-text">
                      ${Number(w.totalRevenue).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted">Revenue</p>
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