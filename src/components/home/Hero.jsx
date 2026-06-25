"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Book, Users, Star } from "lucide-react";

export default function Hero() {
  const heroBackgroundStyle = {
    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(255, 249, 245, 0.98) 25%,
        rgba(255, 249, 245, 0.88) 50%,
        rgba(255, 249, 245, 0.45) 75%,
        rgba(255, 249, 245, 0.15) 100%
      ),
      url('/images/hero/hero-bg.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const statCardStyle = {
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <section 
      className="relative overflow-hidden min-h-[90vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24"
      style={heroBackgroundStyle}
    >
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          <div className="lg:col-span-7 xl:col-span-6">
            
           

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight"
              style={{ color: "var(--brand)" }}
            >
              Discover &
              <span style={{ color: "var(--primary)" }}>
                {" "}Read Original
              </span>
              <br />
              Ebooks
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg max-w-xl leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Fable connects passionate readers with talented writers.
              Explore thousands of original ebooks, support creators,
              and build your personal digital library.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/browse"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                  }}
                >
                  Browse Ebooks
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all shadow-sm hover:shadow-md"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--brand)",
                    backgroundColor: "white",
                  }}
                >
                  <BookOpen size={18} style={{ color: "var(--primary)" }} />
                  Become a Writer
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-white/20 shadow-sm" style={{ ...statCardStyle, color: "var(--primary)" }}>
                  <Book size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-none" style={{ color: "var(--brand)" }}>10K+</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Ebooks</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-white/20 shadow-sm" style={{ ...statCardStyle, color: "var(--primary)" }}>
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-none" style={{ color: "var(--brand)" }}>5K+</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Writers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-white/20 shadow-sm" style={{ ...statCardStyle, color: "var(--primary)" }}>
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-none" style={{ color: "var(--brand)" }}>50K+</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Readers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-white/20 shadow-sm text-yellow-500" style={statCardStyle}>
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-xl font-bold leading-none" style={{ color: "var(--brand)" }}>4.8</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Avg Rating</p>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-center items-center min-h-[400px]">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-12, 12, -12] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 p-5 rounded-2xl border border-white/30 shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div className="w-full h-64 relative rounded-xl mb-4 overflow-hidden flex items-center justify-center text-4xl" style={{ background: "var(--secondary)" }}>
                📕
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                Ebook of the Week
              </span>
              <h3 className="text-lg font-bold mt-1 leading-tight" style={{ color: "var(--brand)" }}>
                Beyond the Horizon
              </h3>
              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-medium ml-1" style={{ color: "var(--muted)" }}>4.9</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-white text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,10.3,81.33,13.68,149.21,22.4,214.44,24.18,231.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}