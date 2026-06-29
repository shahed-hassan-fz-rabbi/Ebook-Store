"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import EbookCard from "@/components/ebook/EbookCard";
import useEBooks from "@/hooks/useEBooks";

export default function FeaturedBooks() {
  const { ebooks, isLoading } = useEBooks({ limit: 6, sort: "-createdAt" });

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: "rgba(249,115,22,0.1)", color: "var(--primary)" }}
          >
            ✨ Featured Collection
          </span>
          <h2 className="text-4xl font-bold" style={{ color: "var(--brand)" }}>
            Featured Ebooks
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            Discover our most popular ebooks handpicked for you.
          </p>
        </motion.div>

        {/* Skeleton Loading */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden animate-pulse"
                style={{ backgroundColor: "var(--card)", height: "420px" }}
              />
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--muted)" }}>
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p>No ebooks available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ebooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EbookCard ebook={book} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Browse All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/browse">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                boxShadow: "0 4px 15px rgba(249,115,22,0.3)",
              }}
            >
              Browse All Ebooks
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}