"use client";

import { motion } from "framer-motion";

export default function BrowseHero() {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(135deg,#fff9f5 0%,#fff3ea 45%,#ffe8d6 100%)",
      }}
    >
      <div className="container text-center">

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="text-5xl lg:text-6xl font-extrabold"
          style={{
            color: "var(--brand)",
          }}
        >
          Browse Our
          <span style={{ color: "var(--primary)" }}>
            {" "}Collection
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="max-w-2xl mx-auto mt-6 text-lg"
          style={{
            color: "var(--muted)",
          }}
        >
          Discover thousands of original ebooks written by talented authors
          from around the world.
        </motion.p>

      </div>
    </section>
  );
}