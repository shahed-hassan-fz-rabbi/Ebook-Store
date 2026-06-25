"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Star,
  Bookmark,
  ShoppingBag,
  UserRound,
  BookOpen,
} from "lucide-react";

export default function EbookCard({ ebook }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: .25,
      }}
      className="group overflow-hidden rounded-3xl border"
      style={{
        background: "var(--white)",
        borderColor: "var(--border)",
        boxShadow: "0 8px 30px rgba(0,0,0,.05)",
      }}
    >
      {/* Image */}

      <div className="relative overflow-hidden aspect-[3/4]">

        <Image
          src={ebook.cover}
          alt={ebook.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Genre */}

        <div className="absolute top-4 left-4">

          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(255,255,255,.9)",
              color: "var(--brand)",
            }}
          >
            {ebook.genre}
          </span>

        </div>

        {/* Bookmark */}

        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition"
          style={{
            background: "rgba(255,255,255,.9)",
          }}
        >
          <Bookmark
            size={18}
            color="var(--primary)"
          />
        </button>

      </div>

      {/* Body */}

      <div className="p-6">

        <Link
          href={`/ebooks/${ebook._id}`}
        >
          <h2
            className="text-xl font-bold line-clamp-2 hover:text-orange-500 transition"
            style={{
              color: "var(--brand)",
            }}
          >
            {ebook.title}
          </h2>
        </Link>

        {/* Writer */}

        <div className="flex items-center gap-2 mt-4">

          <UserRound
            size={17}
            color="var(--primary)"
          />

          <p
            className="text-sm"
            style={{
              color: "var(--muted)",
            }}
          >
            {ebook.writer}
          </p>

        </div>

        {/* Rating */}

        <div className="flex items-center justify-between mt-5">

          <div className="flex items-center gap-2">

            <Star
              size={17}
              fill="#FACC15"
              color="#FACC15"
            />

            <span className="text-sm">

              {ebook.rating}

            </span>

          </div>

          <div
            className="flex items-center gap-2"
          >
            <BookOpen
              size={17}
              color="var(--primary)"
            />

            <span
              className="text-sm"
            >
              {ebook.sold} Sold
            </span>

          </div>

        </div>

        {/* Bottom */}

        <div className="flex items-center justify-between mt-6">

          <h3
            className="text-2xl font-bold"
            style={{
              color: "var(--primary)",
            }}
          >
            ${ebook.price}
          </h3>

          <motion.button
            whileTap={{
              scale: .95,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            <ShoppingBag size={18} />

            Buy

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}