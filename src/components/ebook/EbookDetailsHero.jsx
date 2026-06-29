"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { checkout } from "@/services/purchase.service";
import { addBookmark } from "@/services/bookmark.service";

import {
  Star,
  UserRound,
  BookOpen,
  ShoppingBag,
  Bookmark,
} from "lucide-react";

export default function EbookDetailsHero({ ebook }) {
  const handleBuyNow = async () => {
    try {
      const res = await checkout(ebook._id);

      // Stripe Checkout URL
      window.location.href = res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Checkout failed"
      );
    }
  };

  const handleBookmark = async () => {
    try {
      await addBookmark(ebook._id);

      toast.success("Added to Bookmark");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Bookmark failed"
      );
    }
  };

  if (!ebook) return null;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-14">

          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={
                  ebook.coverImage ||
                  "https://placehold.co/500x700?text=No+Cover"
                }
                alt={ebook.title}
                width={500}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <span
              className="inline-block rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "var(--card)",
                color: "var(--primary)",
              }}
            >
              {ebook.genre}
            </span>

            <h1
              className="mt-6 text-5xl font-bold"
              style={{
                color: "var(--brand)",
              }}
            >
              {ebook.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-8">

              <div className="flex items-center gap-2">
                <UserRound size={18} />
                <span>
                  {ebook.author?.name ||
                    "Unknown Writer"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={18}
                  fill="#FACC15"
                  color="#FACC15"
                />
                <span>
                  {Number(
                    ebook.averageRating || 0
                  ).toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>
                  {ebook.totalSales || 0} Sold
                </span>
              </div>

            </div>

            <p
              className="mt-10 text-lg leading-8"
              style={{
                color: "var(--muted)",
              }}
            >
              {ebook.description}
            </p>

            {/* Extra Info */}

            <div className="mt-10 grid grid-cols-2 gap-5 rounded-2xl border p-6">

              <div>
                <p className="text-sm text-gray-500">
                  Language
                </p>

                <h4 className="font-semibold">
                  {ebook.language}
                </h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <h4 className="font-semibold capitalize">
                  {ebook.status}
                </h4>
              </div>

            </div>

            {/* Price */}

            <div className="mt-10 flex flex-wrap items-center gap-5">

              <h2
                className="text-5xl font-bold"
                style={{
                  color: "var(--primary)",
                }}
              >
                ${ebook.price}
              </h2>

              <button
                onClick={handleBuyNow}
                className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600 flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Buy Now
              </button>

              <button
                onClick={handleBookmark}
                className="rounded-xl border px-8 py-4 transition hover:bg-gray-100 flex items-center gap-2"
              >
                <Bookmark size={18} />
                Bookmark
              </button>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}