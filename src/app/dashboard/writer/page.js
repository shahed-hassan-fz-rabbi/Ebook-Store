"use client";

import { useEffect, useState } from "react";

import {
  BookOpen,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

import { getWriterDashboard } from "@/services/writer.service";

export default function WriterDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res =
        await getWriterDashboard();

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats)
    return (
      <h2 className="text-2xl">
        Loading...
      </h2>
    );

  const cards = [
    {
      title: "My Books",
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
      value: `$${stats.revenue}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Writer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <div
                className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}
              >
                <Icon />
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