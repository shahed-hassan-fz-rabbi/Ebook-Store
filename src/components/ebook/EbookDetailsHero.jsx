"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleBuyNow = async () => {
    try {
      const res = await checkout(ebook._id);

      // Backend returns Stripe URL in data
      window.location.href = res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Checkout failed"
      );
    }
  };

  const handleBookmark = async () => {
    try {
      await addBookmark(ebook._id);

      toast.success("Added to Bookmark");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Bookmark failed"
      );
    }
  };

  if (!ebook) return null;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-14 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                boxShadow: "0 20px 50px rgba(0,0,0,.08)",
              }}
            >
              <Image
                src={
                  ebook.coverImage ||
                  ebook.cover ||
                  "https://placehold.co/500x700?text=No+Cover"
                }
                alt={ebook.title}
                width={500}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "var(--card)",
                color: "var(--primary)",
              }}
            >
              {ebook.genre}
            </span>

            <h1
              className="text-5xl font-bold mt-6"
              style={{
                color: "var(--brand)",
              }}
            >
              {ebook.title}
            </h1>

            <div className="flex flex-wrap gap-8 mt-8">

              <div className="flex items-center gap-2">
                <UserRound size={18} />
                {ebook.author?.name || ebook.writer || "Unknown Writer"}
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={18}
                  fill="#facc15"
                  color="#facc15"
                />
                {ebook.averageRating || ebook.rating || 0}
              </div>

              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                {ebook.totalSales || ebook.sold || 0} Sold
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

            <div className="flex flex-wrap items-center gap-5 mt-10">

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
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition text-white"
              >
                <ShoppingBag size={20} />
                Buy Now
              </button>

              <button
                onClick={handleBookmark}
                className="px-8 py-4 rounded-xl border hover:bg-gray-100 transition flex items-center gap-2"
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