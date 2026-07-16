"use client";

import { motion } from "framer-motion";
import { BookOpen, PenSquare, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Read Anywhere",
    description:
      "Enjoy your favorite ebooks anytime, anywhere on any device.",
  },
  {
    icon: PenSquare,
    title: "Publish Easily",
    description:
      "Writers can publish and manage ebooks through a simple dashboard.",
  },
  {
    icon: Users,
    title: "Growing Community",
    description:
      "Join thousands of readers and writers sharing knowledge and stories.",
  },
];

export default function AboutStory() {
  return (
    <section className="bg-[#FFF9F5] py-20 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
          >
            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              Our Story
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900 dark:text-white">
              Built with passion for
              readers and writers.
            </h2>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
              Fable is a modern ebook platform where readers discover
              original digital books and writers share their creativity
              with the world.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
              We believe reading should be accessible,
              publishing should be simple,
              and every great story deserves an audience.
            </p>
          </motion.div>

          {/* Right */}

          <div className="space-y-6">

            {features.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * .15,
                    duration: .5,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >

                  <div className="flex gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">

                      <Icon size={24} />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">

                        {item.title}

                      </h3>

                      <p className="mt-2 text-slate-600 dark:text-slate-400">

                        {item.description}

                      </p>

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}