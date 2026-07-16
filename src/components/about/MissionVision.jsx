"use client";

import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    color: "bg-orange-500",
    description:
      "To empower independent writers and provide readers with a secure, modern, and enjoyable digital reading experience.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    color: "bg-blue-500",
    description:
      "To become a trusted ebook sharing platform where creativity, learning, and technology come together.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-white py-20 dark:bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center max-w-3xl mx-auto">

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
          >
            <Sparkles size={16} />
            Our Purpose
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="mt-6 text-4xl font-black text-slate-900 dark:text-white"
          >
            Inspiring Readers,
            <span className="text-orange-500">
              {" "}Empowering Writers
            </span>
          </motion.h2>

          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
            We believe every story deserves an audience and every reader
            deserves an amazing reading experience.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {cards.map((item, index) => {

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
                  y: -6,
                }}
                className="rounded-3xl border border-slate-200 bg-[#FFF9F5] p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white`}>

                  <Icon size={26} />

                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">

                  {item.title}

                </h3>

                <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">

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