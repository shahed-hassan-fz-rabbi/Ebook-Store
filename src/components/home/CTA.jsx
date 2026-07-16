"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-hover px-8 py-20 text-center"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Start your reading journey
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-[17px] text-white/90">
          Create a free account, explore original stories, and support the
          writers you love.
        </p>

        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/browse">
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Browse Library
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}