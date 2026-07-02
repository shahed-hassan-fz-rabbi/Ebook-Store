"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  CreditCard, 
  Calendar, 
  User, 
  ArrowUpRight,
  Receipt,
  PenTool,
  Tag
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/admin/transactions");
        setTransactions(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        toast.error("Could not load transaction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((trx) => {
    const query = searchQuery.toLowerCase();
    const buyerMatch = trx.buyer?.name?.toLowerCase().includes(query) || trx.buyer?.email?.toLowerCase().includes(query);
    const ebookMatch = trx.ebook?.title?.toLowerCase().includes(query);
    const writerMatch = trx.writer?.name?.toLowerCase().includes(query) || trx.writer?.email?.toLowerCase().includes(query);
    const idMatch = trx._id?.toLowerCase().includes(query);
    
    return buyerMatch || ebookMatch || writerMatch || idMatch;
  });

  const totalVolume = transactions.reduce((acc, curr) => acc + Number(curr.price || 0), 0);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-6">
      
      {/* Header & Controls Panel */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Transaction History</h1>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">Monitor all platform purchases, fees, and revenue flow.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Revenue Indicator Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
            <CreditCard size={16} className="text-indigo-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider leading-none">Total Volume</span>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-tight">${totalVolume.toFixed(2)}</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search buyer, ebook, or TRX ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Table Layer */}
      <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900/40 border-b border-neutral-100 dark:border-neutral-800/60 text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Ebook & Writer</th>
                <th className="p-4">Buyer Details</th>
                <th className="p-4">Type</th>
                <th className="p-4">Date & TRX ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {loading ? (
                [...Array(5)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="w-10 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-lg shrink-0" />
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-20" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-28" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-36" />
                      </div>
                    </td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16" /></td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
                      </div>
                    </td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16" /></td>
                    <td className="p-4 pr-6"><div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-neutral-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                        <Receipt size={20} className="text-neutral-400" />
                      </div>
                      <p>No transaction records found matching the criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => {
                  const bookTitle = trx.ebook?.title || "N/A (Platform Fee)";
                  const bookCover = trx.ebook?.coverImage || "/images/placeholder-book.jpg";
                  const writerName = trx.writer?.name || "Unknown Writer";
                  const writerEmail = trx.writer?.email || "";
                  const buyerName = trx.buyer?.name || "Unknown User";
                  const buyerEmail = trx.buyer?.email || "No Email Provided";
                  const trxType = trx.type || "purchase";
                  const price = Number(trx.price || 0).toFixed(2);
                  const status = trx.paymentStatus || "paid";
                  
                  const date = trx.createdAt 
                    ? new Date(trx.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                    : "N/A";

                  return (
                    <tr key={trx._id} className="hover:bg-neutral-50/30 dark:hover:bg-neutral-900/10 transition-colors">
                      <td className="p-4 pl-6 max-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-14 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border dark:border-neutral-800 shrink-0 shadow-sm flex items-center justify-center">
                            {trxType.toLowerCase() === "publishing fee" ? (
                              <Tag size={20} className="text-neutral-400" />
                            ) : (
                              <Image src={bookCover} alt={bookTitle} fill className="object-cover" sizes="40px" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-neutral-800 dark:text-neutral-100 truncate">
                              {bookTitle}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1 mt-0.5 truncate">
                              <PenTool size={10} className="shrink-0" /> {writerName} {writerEmail ? `(${writerEmail})` : ''}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 truncate">
                            <User size={12} className="text-neutral-400 shrink-0" /> {buyerName}
                          </span>
                          <span className="text-[10px] text-neutral-400 mt-0.5 ml-4 truncate">
                            {buyerEmail}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-[11px] font-bold capitalize text-neutral-700 dark:text-neutral-300">
                          {trxType.replace("-", " ")}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex flex-col min-w-0">
                          <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 font-bold text-[11px]">
                            <Calendar size={12} className="text-neutral-400 shrink-0" /> {date}
                          </span>
                          <span className="text-[9px] text-neutral-400 mt-1 uppercase tracking-wider font-mono truncate max-w-[120px]">
                            ID: {trx._id}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-4 font-black text-indigo-600 dark:text-indigo-400">
                        ${price}
                      </td>
                      
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          status?.toLowerCase() === "paid" 
                            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" 
                            : "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                        }`}>
                          <ArrowUpRight size={12} /> {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}