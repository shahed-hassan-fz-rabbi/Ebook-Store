"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopWriters = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/purchases/top-writers");
        setWriters(res.data?.data || []);
      } catch (error) {
        console.error(error);
        setWriters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopWriters();
  }, []);

  const SkeletonCard = () => (
    <div
      className="rounded-3xl overflow-hidden border animate-pulse"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="h-72 w-full" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />
      <div className="p-6">
        <div className="h-6 w-3/4 rounded mb-5" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-xl" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />
          <div className="h-16 rounded-xl" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />
          <div className="h-16 rounded-xl" style={{ backgroundColor: "var(--border)", opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold"
            style={{ color: "var(--brand)" }}
          >
            Top Writers
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Meet the talented authors creating amazing ebooks for thousands of readers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : writers.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <Trophy size={24} style={{ color: "var(--muted)" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--brand)" }}>No Top Writers Yet</h3>
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Sales data is currently being updated.</p>
            </div>
          ) : (
            writers.map((writer, index) => (
              <motion.div
                key={writer._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden border group"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="relative h-72 overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Image
                    src={writer.photo || "/images/placeholders/writer.jpg"}
                    alt={writer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md font-bold text-sm" style={{ backgroundColor: "var(--primary)", color: "white" }}>
                    #{index + 1}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-xl font-bold truncate"
                    style={{ color: "var(--brand)" }}
                  >
                    {writer.name}
                  </h3>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-xl p-3 text-center bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                      <p className="text-lg font-black">{writer.totalBooks || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Books</p>
                    </div>

                    <div className="rounded-xl p-3 text-center bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                      <p className="text-lg font-black">{writer.totalSales || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Sales</p>
                    </div>

                    <div className="rounded-xl p-3 text-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                      <p className="text-lg font-black">${writer.totalRevenue || 0}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Revenue</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}