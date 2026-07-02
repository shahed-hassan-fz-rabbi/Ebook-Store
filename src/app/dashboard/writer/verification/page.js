"use client";

import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Loader2, BookOpen, ShoppingBag, DollarSign, Plus, User } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function WriterDashboard() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ totalBooks: 0, totalSales: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/writer/dashboard-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data.books || []);
        setStats(response.data.stats || { totalBooks: 0, totalSales: 0, totalRevenue: 0 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[var(--background)]">
        <Loader2 size={36} className="animate-spin" style={{ color: "var(--primary)" }} />
        <p className="mt-3 text-xs font-medium" style={{ color: "var(--muted)" }}>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border bg-[var(--card)] gap-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 flex items-center justify-center bg-[var(--background)]" style={{ borderColor: "var(--primary)" }}>
            {user?.photo ? (
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={32} style={{ color: "var(--muted)" }} />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--brand)" }}>{user?.name || "Writer"}</h1>
            <p className="text-xs uppercase tracking-wider font-semibold mt-0.5" style={{ color: "var(--primary)" }}>{user?.role || "Author"}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{user?.email}</p>
          </div>
        </div>

        <Link href="/writer/add-ebook">
          <button className="h-11 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white shadow-sm cursor-pointer transition-all hover:opacity-90" style={{ backgroundColor: "var(--primary)" }}>
            <Plus size={16} />
            Publish New Book
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border bg-[var(--card)] flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>My Books</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>{stats.totalBooks || books.length}</h2>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-orange-500">
            <BookOpen size={22} />
          </div>
        </div>

        <div className="p-6 rounded-2xl border bg-[var(--card)] flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Sales</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>{stats.totalSales}</h2>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50 text-purple-500">
            <ShoppingBag size={22} />
          </div>
        </div>

        <div className="p-6 rounded-2xl border bg-[var(--card)] flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Revenue</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>${stats.totalRevenue}</h2>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 text-green-500">
            <DollarSign size={22} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--brand)" }}>My Published Books</h2>
        
        {books.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border bg-[var(--card)]" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>You haven't published any ebooks yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book._id} className="rounded-2xl border overflow-hidden bg-[var(--card)] transition-all hover:shadow-md" style={{ borderColor: "var(--border)" }}>
                <div className="relative aspect-[3/4] w-full bg-[var(--background)]">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>{book.genre}</span>
                  <h3 className="text-sm font-bold truncate" style={{ color: "var(--brand)" }}>{book.title}</h3>
                  <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}