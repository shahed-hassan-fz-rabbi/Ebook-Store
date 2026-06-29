"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, UserRound, BookOpen, Eye } from "lucide-react";

export default function EbookCard({ ebook }) {
  const isAvailable = ebook.status === "published";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={ebook.coverImage || "https://placehold.co/400x560/FFF1E8/F97316?text=No+Cover"}
          alt={ebook.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Genre */}
        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">
          {ebook.genre}
        </span>

        {/* Status */}
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </span>

        {/* Hover View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/ebooks/${ebook._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-gray-900 shadow-lg hover:bg-orange-500 hover:text-white transition"
            >
              <Eye className="mr-2 inline" size={18} />
              View Details
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">

        {/* Title */}
        <Link href={`/ebooks/${ebook._id}`}>
          <h2 className="line-clamp-2 text-lg font-bold text-gray-900 hover:text-orange-500 transition">
            {ebook.title}
          </h2>
        </Link>

        {/* Author */}
        <div className="mt-3 flex items-center gap-2">
          <UserRound size={16} className="text-orange-500" />
          <span className="text-sm text-gray-500">
            {ebook.author?.name || "Unknown Author"}
          </span>
        </div>

        {/* Rating + Sales */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={15} fill="#FACC15" color="#FACC15" />
            <span className="text-sm font-medium text-gray-700">
              {ebook.averageRating > 0 ? ebook.averageRating.toFixed(1) : "New"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={15} className="text-orange-500" />
            <span className="text-sm text-gray-500">
              {ebook.totalSales || 0} Sold
            </span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-100" />

        {/* Price + Buy */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Price</p>
            <h3 className="text-2xl font-bold text-orange-500">${ebook.price}</h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 font-semibold text-white hover:bg-orange-600 transition"
          >
            <ShoppingCart size={16} />
            Buy
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}