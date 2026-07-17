"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="w-full relative overflow-hidden transition-colors duration-300">
      {/* Reduced top and bottom padding to bring the card into perfect balance */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: "0.5rem", // Tightened gap from Testimonials section above
          paddingBottom: "clamp(2rem, 5vw, 4rem)", // Perfectly standardized space before the footer
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-xl"
          style={{ 
            background: "linear-gradient(135deg, var(--primary) 0%, #ea580c 100%)" 
          }}
        >
          {/* Decorative Background Elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-serif)]">
            Start your reading journey
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base md:text-[17px] text-white/90 font-medium leading-relaxed">
            Create a free account, explore original stories, and support the
            writers you love.
          </p>

          {/* Buttons with Professional Custom Padding */}
          <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-orange-600 hover:bg-white/95 px-8 py-4 text-base font-bold shadow-md rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <Link href="/browse" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-white hover:bg-white/10 px-8 py-4 text-base font-bold rounded-xl transition-all hover:scale-[1.02]"
              >
                Browse Library
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}