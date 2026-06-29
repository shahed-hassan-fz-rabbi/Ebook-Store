"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          color: currentPage === 1 ? "var(--muted)" : "var(--brand)",
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <ChevronLeft size={18} />
      </motion.button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <motion.button
          key={p}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(p)}
          className="w-10 h-10 rounded-xl text-sm font-medium transition-all"
          style={{
            backgroundColor: currentPage === p ? "var(--primary)" : "var(--card)",
            color: currentPage === p ? "white" : "var(--brand)",
            border: "1px solid var(--border)",
          }}
        >
          {p}
        </motion.button>
      ))}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          color: currentPage === totalPages ? "var(--muted)" : "var(--brand)",
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <ChevronRight size={18} />
      </motion.button>
    </div>
  );
}