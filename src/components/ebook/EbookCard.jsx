"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Bookmark,
  ShoppingCart,
  UserRound,
  BookOpen,
  Eye,
} from "lucide-react";

export default function EbookCard({ ebook }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={
            ebook.cover ||
            "https://placehold.co/600x800?text=No+Cover"
          }
          alt={ebook.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Genre */}
        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">
          {ebook.genre}
        </span>

        {/* Status */}
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
            ebook.status === "sold"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {ebook.status === "sold" ? "Sold" : "Available"}
        </span>

        {/* Hover Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Link href={`/ebooks/${ebook._id}`}>
            <button className="rounded-xl bg-white px-5 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-orange-500 hover:text-white">
              <Eye className="mr-2 inline" size={18} />
              View Details
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/ebooks/${ebook._id}`}>
          <h2 className="line-clamp-2 text-xl font-bold text-gray-900 transition hover:text-orange-500">
            {ebook.title}
          </h2>
        </Link>

        {/* Writer */}
        <div className="mt-4 flex items-center gap-2">
          <UserRound
            size={18}
            className="text-orange-500"
          />

          <span className="text-sm text-gray-500">
            {ebook.authorName || ebook.writer}
          </span>
        </div>

        {/* Rating + Sold */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star
              size={17}
              fill="#FACC15"
              color="#FACC15"
            />

            <span className="font-medium">
              {ebook.rating || 5}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen
              size={17}
              className="text-orange-500"
            />

            <span className="text-sm text-gray-500">
              {ebook.sold || 0} Sold
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t"></div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Price
            </p>

            <h3 className="text-3xl font-bold text-orange-500">
              ${ebook.price}
            </h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <ShoppingCart size={18} />
            Buy
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}