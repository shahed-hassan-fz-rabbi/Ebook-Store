"use client";

import { useEffect, useState } from "react";

import {
  Users,
  BookOpen,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

import { getAnalytics } from "@/services/admin.service";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: BookOpen,
      color: "bg-orange-500",
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Icon size={28} />
              </div>

              <h2 className="mt-5 text-gray-500 font-medium">
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