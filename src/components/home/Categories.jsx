"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GENRES } from "@/constants/genres";

import {
  BookOpen,
  Search,
  Heart,
  Rocket,
  WandSparkles,
  Ghost,
  User,
  Lightbulb,
  Landmark,
  Flame,
} from "lucide-react";

const genreIcons = {
  Fiction: BookOpen,
  Mystery: Search,
  Romance: Heart,
  "Sci-Fi": Rocket,
  Fantasy: WandSparkles,
  Horror: Ghost,
  Biography: User,
  "Self Help": Lightbulb,
  History: Landmark,
  Thriller: Flame,
};

export default function Categories() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold"
            style={{ color: "var(--brand)" }}
          >
            Browse by Category
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Discover ebooks from your favorite genres and start reading today.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {GENRES.map((genre, index) => {
            const Icon = genreIcons[genre.name];

            return (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/browse?genre=${genre.slug}`}
                  className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border hover:-translate-y-2 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(249,115,22,.12)",
                    }}
                  >
                    <Icon
                      size={30}
                      style={{ color: "var(--primary)" }}
                    />
                  </div>

                  <h3
                    className="font-semibold text-lg text-center"
                    style={{ color: "var(--brand)" }}
                  >
                    {genre.name}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}