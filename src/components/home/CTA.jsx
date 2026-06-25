"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenTool, BookOpen } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), #FB923C, var(--accent))",
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full"
            style={{
              background: "rgba(255,255,255,.08)",
              filter: "blur(20px)",
            }}
          />

          <div
            className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full"
            style={{
              background: "rgba(255,255,255,.08)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">

            <motion.div
              initial={{ scale: .8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: .2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <PenTool size={38} color="white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Share Your Story With The World
            </h2>

            <p className="mt-6 text-white/90 text-lg leading-8">
              Become a verified writer on <strong>Fable</strong> and publish
              your original ebooks. Reach thousands of readers, build your
              audience, and earn from every successful purchase.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white"
                style={{
                  color: "var(--primary)",
                }}
              >
                <BookOpen size={20} />
                Become a Writer
              </Link>

              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Browse Ebooks
                <ArrowRight size={20} />
              </Link>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}