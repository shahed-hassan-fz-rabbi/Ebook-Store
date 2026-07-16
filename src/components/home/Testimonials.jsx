"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Avid Reader",
    text: "Fable completely changed how I discover books. The reading experience is buttery smooth and I've found so many hidden gems from indie authors.",
  },
  {
    name: "James Okafor",
    role: "Published Writer",
    text: "Getting my work in front of real readers used to feel impossible. Fable made publishing and earning genuinely effortless.",
  },
  {
    name: "Elena Ruiz",
    role: "Book Collector",
    text: "The cleanest ebook platform I've used. Beautiful design, instant purchases, and my whole library synced across devices.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Loved by readers &amp; writers
        </h2>
        <p className="mt-3 text-[17px] text-muted">
          Join a growing community that reads with Fable.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_var(--shadow)]"
          >
            <Quote className="h-9 w-9 text-primary/25" />

            <div className="mt-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>

            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text">
              {t.text}
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-[15px] font-semibold text-text">{t.name}</p>
                <p className="text-[13px] text-muted">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}