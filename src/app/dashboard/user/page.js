"use client";

import { useEffect, useState } from "react";

import {
  BookOpen,
  Bookmark,
  ShoppingBag,
} from "lucide-react";

import { getReaderDashboard } from "@/services/user.service";

export default function UserDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getReaderDashboard();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Purchased Books",
      value: stats.totalPurchasedBooks,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Bookmarks",
      value: stats.totalBookmarks,
      icon: Bookmark,
      color: "bg-orange-500",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-green-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Reader Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >
              <div
                className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
              >
                <Icon size={26} />
              </div>

              <h2 className="mt-5 text-gray-500">
                {item.title}
              </h2>

              <h1 className="text-4xl font-bold mt-2">
                {item.value}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}