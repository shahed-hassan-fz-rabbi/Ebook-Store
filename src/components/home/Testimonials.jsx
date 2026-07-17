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
    <section className="w-full relative overflow-hidden transition-colors duration-300">
      {/* Kept intentionally tight — if there's still a big gap above this
          section, it's coming from the component before it (Top Writers),
          not from here. Share that file and I'll fix it at the source. */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "clamp(0.5rem, 2vw, 1.5rem)",
          paddingBottom: "clamp(2.5rem, 6vw, 4rem)",
        }}
      >
        {/* Header Block */}
        <div className="max-w-xl text-left" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl font-[family-name:var(--font-serif)]"
            style={{ color: "var(--brand)" }}
          >
            Loved by readers &amp; writers
          </h2>
          <p className="mt-2 text-base font-medium" style={{ color: "var(--muted)" }}>
            Join a growing community that reads with Fable.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)")}
            >
              {/* Oversized decorative quote mark, bleeding off the corner */}
              <Quote
                className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 shrink-0"
                style={{ color: "var(--primary)", opacity: 0.06 }}
                strokeWidth={1}
              />

              {/* Top part of the card */}
              <div className="relative flex-1 flex flex-col">
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p
                  className="mt-4 flex-1 text-[15px] leading-relaxed font-medium"
                  style={{ color: "var(--brand)" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Bottom profile info */}
              <div
                className="relative mt-6 flex items-center gap-3 border-t pt-4 shrink-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm"
                  style={{ backgroundColor: "rgba(249, 115, 22, 0.1)", color: "var(--primary)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[15px] font-semibold italic tracking-tight truncate font-[family-name:var(--font-serif)]"
                    style={{ color: "var(--brand)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-[13px] font-medium truncate" style={{ color: "var(--muted)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}