"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  PenTool, 
  BookOpen, 
  DollarSign, 
  Loader2, 
  TrendingUp,
  PieChart as PieChartIcon
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const PIE_COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"];

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWriters: 0,
    totalEbooks: 0,
    totalRevenue: 0,
    monthlySales: [],
    genreStats: [] // Updated to match backend response
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/admin/analytics");
        
        setStats(res.data?.data || {
          totalUsers: 0,
          totalWriters: 0,
          totalEbooks: 0,
          totalRevenue: 0,
          monthlySales: [
            { month: "Jan", sales: 0 }, { month: "Feb", sales: 0 }, { month: "Mar", sales: 0 },
            { month: "Apr", sales: 0 }, { month: "May", sales: 0 }, { month: "Jun", sales: 0 }
          ],
          genreStats: [
            { name: "No Data", value: 100 }
          ]
        });
      } catch (err) {
        console.error("Failed to load admin statistics:", err);
        toast.error("Failed to load platform analytics."); // Professional error handling
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const cardItems = [
    { label: "Total Users", count: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Total Writers", count: stats.totalWriters, icon: PenTool, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { label: "Total Ebooks", count: stats.totalEbooks, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Platform Revenue", count: `$${Number(stats.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-xl">
          <p className="text-xs font-bold text-neutral-500 mb-1">{label}</p>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            {/* Safe numerical casting for tooltip values */}
            ${Number(payload[0].value || 0).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-8">
      
      {/* Banner Unit */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-5%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Overview 🛡️</h1>
          <p className="text-indigo-100 text-sm font-medium">Monitor platform health, revenue streams, and content demographics.</p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {loading ? <Loader2 size={18} className="animate-spin text-neutral-300" /> : stat.count}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                <Icon size={20} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Monthly Sales Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm space-y-6 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-500" /> Platform Revenue Trend
            </h3>
          </div>
          
          <div className="w-full flex-1 min-h-[300px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl animate-pulse">
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#525252" opacity={0.15} />
                  {/* Updated dataKey to match backend output */}
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} tickFormatter={(val) => `$${val}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Genre Distribution Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm space-y-6 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <PieChartIcon size={16} className="text-indigo-500" /> Content by Genre
            </h3>
          </div>

          <div className="w-full flex-1 min-h-[300px] flex items-center justify-center">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl animate-pulse">
                <Loader2 size={24} className="animate-spin text-neutral-300" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* Updated data reference */}
                  <Pie
                    data={stats.genreStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.genreStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#171717' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '500' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}