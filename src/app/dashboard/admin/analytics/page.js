"use client";

import { useEffect, useState } from "react";

import {
  Users,
  BookOpen,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

import { getAnalytics } from "@/services/admin.service";

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const res = await getAnalytics();

    setStats(res.data);
  };

  if (!stats)
    return <h2>Loading...</h2>;

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Writers",
      value: stats.totalWriters,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: BookOpen,
      color: "bg-orange-500",
    },
    {
      title: "Sales",
      value: stats.totalSales,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "bg-pink-500",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <div
                className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
              >
                <Icon />
              </div>

              <h3 className="mt-5 text-gray-500">
                {card.title}
              </h3>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>

            </div>
          );
        })}

      </div>

    </div>
  );
}