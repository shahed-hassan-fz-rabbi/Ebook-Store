"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Eye, EyeOff, Plus, Loader2, Search, AlertTriangle } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function ManageEbooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchWriterBooks = async () => {
    try {
      setLoading(true);
      // Adjusted endpoint route mapping pattern tracking backend schema architecture
      const res = await axiosInstance.get("/writer/my-ebooks");
      setBooks(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch ebooks:", err);
      toast.error("Could not load your ebooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWriterBooks();
  }, []);

  const handleToggleStatus = async (bookId, currentStatus) => {
    try {
      const nextStatus = currentStatus === "published" ? "unpublished" : "published";
      
      setBooks((prev) =>
        prev.map((b) => (b._id === bookId ? { ...b, status: nextStatus } : b))
      );

      await axiosInstance.patch(`/ebooks/${bookId}/toggle-status`, { status: nextStatus });
      toast.success(`Book successfully ${nextStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
      fetchWriterBooks();
    }
  };

  const openDeleteModal = (bookId) => {
    setSelectedBookId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBookId) return;
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/ebooks/${selectedBookId}`);
      
      setBooks((prev) => prev.filter((b) => b._id !== selectedBookId));
      toast.success("Ebook deleted permanently");
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ebook");
    } finally {
      setActionLoading(false);
      setSelectedBookId(null);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Manage Ebooks</h1>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">Update, status toggle or organize your portfolio.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          <Link href="/dashboard/writer/add-ebook" className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0">
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      {/* Main Table Layer */}
      <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900/40 border-b border-neutral-100 dark:border-neutral-800/60 text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Cover & Title</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {loading ? (
                [...Array(3)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="w-9 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg shrink-0" />
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-40" />
                    </td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20" /></td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-12" /></td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16" /></td>
                    <td className="p-4 pr-6"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredBooks.length === 0 ? (
                /* [Fix 5] Embedded action pathway inside Empty State block */
                <tr>
                  <td colSpan="5" className="p-12 text-center text-neutral-400 font-medium space-y-3">
                    <p>No ebooks found matching criteria.</p>
                    <Link href="/dashboard/writer/add-ebook" className="mt-2 inline-flex items-center h-8 px-4 bg-orange-500/10 text-orange-600 rounded-xl text-[11px] font-bold transition-all">
                      Add Ebook Now
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-neutral-50/30 dark:hover:bg-neutral-900/10 transition-colors">
                    {/* [Fix 6] Premium Amazon KDP Style Cover Thumbnail Block */}
                    <td className="p-4 pl-6 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border dark:border-neutral-800 shrink-0 shadow-sm">
                          <img 
                            src={book.coverImage || "/images/placeholder-book.jpg"} 
                            alt="Cover" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-neutral-800 dark:text-neutral-100 truncate">
                          {book.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-500 rounded-md uppercase tracking-wider">
                        {book.genre}
                      </span>
                    </td>
                    {/* [Fix 2] Safe wrapper calculation configuration */}
                    <td className="p-4 font-semibold">${Number(book.price || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md capitalize ${
                        book.status === "published" 
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" 
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${book.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {book.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(book._id, book.status)}
                          className={`p-2 rounded-xl border transition-all ${
                            book.status === "published"
                              ? "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-amber-500"
                              : "border-orange-100 dark:border-orange-950/30 text-orange-500 hover:bg-orange-500 hover:text-white"
                          }`}
                          title={book.status === "published" ? "Unpublish Ebook" : "Publish Ebook"}
                        >
                          {book.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>

                        <Link href={`/dashboard/writer/edit-ebook/${book._id}`}>
                          <button className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-orange-500 transition-colors">
                            <Edit3 size={14} />
                          </button>
                        </Link>

                        <button
                          onClick={() => openDeleteModal(book._id)}
                          className="p-2 rounded-xl border border-red-100 dark:border-red-950/30 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION OVERLAY MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-neutral-950 max-w-md w-full rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800/80 shadow-xl relative z-10 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-500">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white">Delete Ebook?</h3>
                  <p className="text-xs text-neutral-400 font-medium mt-0.5">This action cannot be undone.</p>
                </div>
              </div>
              
              {/* [Fix 4] Altered description layout targeting non-chapter standard configurations */}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Deleting this ebook will permanently remove it from the platform. This action cannot be undone.
              </p>

              <div className="flex gap-2 justify-end pt-2">
                <button disabled={actionLoading} onClick={() => setIsDeleteModalOpen(false)} className="h-10 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Cancel</button>
                <button disabled={actionLoading} onClick={handleDeleteConfirm} className="h-10 px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                  {actionLoading ? <Loader2 size={14} className="animate-spin" /> : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}