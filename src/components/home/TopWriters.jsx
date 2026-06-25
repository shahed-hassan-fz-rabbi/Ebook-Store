"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BookOpen } from "lucide-react";

const writers = [
  {
    id: 1,
    name: "Sarah Johnson",
    books: 24,
    rating: 4.9,
    image: "/images/placeholders/writer-1.jpg",
  },
  {
    id: 2,
    name: "David Miller",
    books: 18,
    rating: 4.8,
    image: "/images/placeholders/writer-2.jpg",
  },
  {
    id: 3,
    name: "Emily Carter",
    books: 31,
    rating: 5.0,
    image: "/images/placeholders/writer-3.jpg",
  },
];

export default function TopWriters() {
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

          {writers.map((writer, index) => (
            <motion.div
              key={writer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="relative h-72">

                <Image
                  src={writer.image}
                  alt={writer.name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6">

                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--brand)" }}
                >
                  {writer.name}
                </h3>

                <div className="flex items-center justify-between mt-5">

                  <div className="flex items-center gap-2">
                    <BookOpen
                      size={18}
                      color="var(--primary)"
                    />
                    <span>{writer.books} Books</span>
                  </div>

                  <div className="flex items-center gap-1">

                    <Star
                      size={18}
                      fill="#FACC15"
                      color="#FACC15"
                    />

                    <span>{writer.rating}</span>

                  </div>

                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}