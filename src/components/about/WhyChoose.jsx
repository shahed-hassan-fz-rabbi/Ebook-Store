"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  PenSquare,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Large Ebook Collection",
    description:
      "Browse a growing library of original ebooks across multiple genres.",
  },
  {
    icon: PenSquare,
    title: "Easy Publishing",
    description:
      "Writers can upload, manage, and publish ebooks with a simple workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Stripe-powered checkout ensures fast and secure ebook purchases.",
  },
  {
    icon: Smartphone,
    title: "Read Anywhere",
    description:
      "Continue reading your purchased ebooks from any device at any time.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#FFF9F5] py-20 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            Why Choose Fable
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 dark:text-white">
            Everything You Need
            <span className="text-orange-500"> in One Platform</span>
          </h2>

          <p className="mt-5 text-slate-600 dark:text-slate-400 leading-8">
            Fable combines powerful tools for writers with an enjoyable
            reading experience for readers.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .12,
                  duration: .45,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">

                  <Icon size={26} />

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">

                  {item.title}

                </h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400 leading-7">

                  {item.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}