"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Loader2,
  BookOpen,
  User
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminManageEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAllEbooks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/ebooks");
      setEbooks(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch platform ebooks:", err);
      toast.error("Could not load ebooks directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEbooks();
  }, []);

  const handleToggleStatus = async (bookId, currentStatus) => {
    try {
      const nextStatus = currentStatus === "published" ? "unpublished" : "published";
      
      // Optimistic UI Update
      setEbooks((prev) =>
        prev.map((b) => (b._id === bookId ? { ...b, status: nextStatus } : b))
      );

      await axiosInstance.patch(`/admin/ebooks/${bookId}/status`, { status: nextStatus });
      toast.success(`Ebook forcibly ${nextStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ebook status");
      fetchAllEbooks(); // Revert on failure
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
      await axiosInstance.delete(`/admin/ebooks/${selectedBookId}`);
      
      setEbooks((prev) => prev.filter((b) => b._id !== selectedBookId));
      toast.success("Ebook permanently removed from platform");
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ebook");
    } finally {
      setActionLoading(false);
      setSelectedBookId(null);
    }
  };

  const filteredEbooks = ebooks.filter((book) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = book.title?.toLowerCase().includes(query);
    const authorMatch = book.author?.name?.toLowerCase().includes(query);
    const matchesSearch = titleMatch || authorMatch;
    
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter;
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8 space-y-6">
      
      {/* Header & Controls Panel */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Platform Ebooks</h1>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">Manage and moderate all published content.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          
          <div className="relative flex-1 w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search title or writer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex w-full sm:w-auto gap-3">
            <div className="relative flex-1 sm:w-36 shrink-0">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
              >
                <option value="all">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Horror">Horror</option>
              </select>
            </div>

            <div className="relative flex-1 sm:w-36 shrink-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Table Layer */}
      <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900/40 border-b border-neutral-100 dark:border-neutral-800/60 text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Ebook & Cover</th>
                <th className="p-4">Writer Details</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {loading ? (
                [...Array(4)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="w-10 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-lg shrink-0" />
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
                    </td>
                    <td className="p-4"><div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-28" /></td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20" /></td>
                    <td className="p-4"><div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-12" /></td>
                    <td className="p-4"><div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md w-20" /></td>
                    <td className="p-4 pr-6"><div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredEbooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-neutral-400 font-medium space-y-3">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                        <BookOpen size={20} className="text-neutral-400" />
                      </div>
                      <p>No ebooks found matching the criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEbooks.map((book) => {
                  const safePrice = Number(book.price || 0).toFixed(2);
                  const writerName = book.author?.name || "Unknown Writer";
                  
                  return (
                    <tr key={book._id} className="hover:bg-neutral-50/30 dark:hover:bg-neutral-900/10 transition-colors">
                      <td className="p-4 pl-6 max-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-14 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border dark:border-neutral-800 shrink-0 shadow-sm">
                            <Image 
                              src={book.coverImage || "/images/placeholder-book.jpg"} 
                              alt={book.title || "Cover"} 
                              fill 
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <span className="font-bold text-neutral-800 dark:text-neutral-100 truncate">
                            {book.title}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                          <User size={12} className="text-neutral-400" /> {writerName}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-500 rounded-md uppercase tracking-wider">
                          {book.genre}
                        </span>
                      </td>
                      
                      <td className="p-4 font-bold text-neutral-800 dark:text-neutral-100">
                        ${safePrice}
                      </td>

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
                                : "border-indigo-100 dark:border-indigo-950/30 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                            }`}
                            title={book.status === "published" ? "Force Unpublish" : "Force Publish"}
                          >
                            {book.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>

                          <button
                            onClick={() => openDeleteModal(book._id)}
                            className="p-2 rounded-xl border border-red-100 dark:border-red-950/30 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Ebook"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION OVERLAY MODAL FOR ADMIN DELETION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="bg-white dark:bg-neutral-950 max-w-md w-full rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800/80 shadow-xl relative z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white">Admin Override: Delete Ebook?</h3>
                <p className="text-xs text-neutral-400 font-medium mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              You are about to permanently remove this ebook from the platform. The writer will lose access, and it will be unlisted from the marketplace immediately.
            </p>

            <div className="flex gap-2 justify-end pt-2">
              <button disabled={actionLoading} onClick={() => setIsDeleteModalOpen(false)} className="h-10 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Cancel</button>
              <button disabled={actionLoading} onClick={handleDeleteConfirm} className="h-10 px-5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                {actionLoading ? <Loader2 size={14} className="animate-spin" /> : "Confirm Deletion"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}