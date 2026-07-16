"use client";

import { motion } from "framer-motion";
import { BookOpen, PenTool, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Discover Amazing Books",
    description:
      "Browse thousands of ebooks from talented writers across multiple genres.",
  },
  {
    icon: PenTool,
    title: "Publish With Ease",
    description:
      "Empower writers with a simple publishing experience and reach readers worldwide.",
  },
  {
    icon: Users,
    title: "Build a Community",
    description:
      "Readers and writers connect, review, share, and grow together on one platform.",
  },
];

export default function StorySection() {
  return (
    <section className="bg-[#FFF9F5] py-24 dark:bg-[#020617]">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            Our Story
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-white md:text-5xl">
            Built for readers.
            <br />
            Crafted for writers.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Fable started with one simple mission:
            create a beautiful digital home where passionate readers
            discover incredible stories and writers earn recognition for
            their creativity.
          </p>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Instead of being just another ebook marketplace,
            Fable focuses on community, simplicity, and a delightful
            reading experience inspired by modern digital products.
          </p>
        </motion.div>

        {/* Right Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="space-y-6"
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ duration: .25 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
                    <Icon size={26} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}