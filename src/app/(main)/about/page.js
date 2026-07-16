"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, PenTool, Target, Heart, Globe } from "lucide-react";

import Button from "@/components/ui/Button";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To democratize access to literature and give every writer a global stage.",
  },
  {
    icon: Heart,
    title: "Reader First",
    text: "A calm, beautiful reading experience with no clutter and no distractions.",
  },
  {
    icon: Globe,
    title: "Open to All",
    text: "Anyone can read, and anyone can publish. Stories should have no borders.",
  },
];

const stats = [
  { icon: BookOpen, label: "Original Ebooks", value: "Growing daily" },
  { icon: PenTool, label: "Independent Writers", value: "Worldwide" },
  { icon: Users, label: "Community", value: "Readers & Authors" },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted"
          >
            <BookOpen className="h-4 w-4 text-primary" /> About Fable
          </motion.div>

          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Where readers meet{" "}
            <span className="text-primary">original stories</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Fable is a digital platform that connects ebook lovers with talented
            writers. We help emerging authors reach global audiences while
            giving readers a secure, streamlined place to discover and read
            original work.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3 lg:px-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-lg font-bold text-text">{s.value}</p>
                  <p className="text-sm text-muted">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-text">
            What we stand for
          </h2>
          <p className="mt-3 text-muted">
            The principles behind everything we build.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-hover px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Join the Fable community
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/90">
            Start reading original stories or publish your own today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                Browse Ebooks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}