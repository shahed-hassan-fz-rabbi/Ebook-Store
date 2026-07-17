"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Users, ShoppingBag, PenTool } from "lucide-react";

import { getAllEbooks } from "@/services/ebook.service";
import { unwrapList } from "@/lib/normalize";

export default function Stats() {
  const { data } = useQuery({
    queryKey: ["stats-ebooks"],
    queryFn: () => getAllEbooks({ limit: 1 }),
  });

  const { meta, items } = unwrapList(data);
  const totalBooks = meta?.total ?? items.length;

  const stats = [
    { icon: BookOpen, label: "Ebooks", value: totalBooks },
    { icon: PenTool, label: "Writers", value: "Growing" },
    { icon: Users, label: "Readers", value: "Worldwide" },
    { icon: ShoppingBag, label: "Genres", value: 8 },
  ];

  return (
    <section className="relative z-20 border-y border-border bg-card">
      <div
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "clamp(2.5rem, 5vw, 3.5rem)",
          paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)",
        }}
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-2xl font-bold tracking-tight text-text">
                  {s.value}
                </p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}