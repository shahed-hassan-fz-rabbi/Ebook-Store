"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogIn,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react";

import { AuthContext } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-shadow group-hover:shadow-md"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <BookOpen size={18} color="white" strokeWidth={2.5} />
      </motion.div>
      <span
        className="text-xl font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-[var(--brand)] to-[var(--primary)] bg-clip-text text-transparent"
      >
        Fable
      </span>
    </Link>
  );
}

function AvatarCircle({ user, size = 36 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800 shadow-sm"
      style={{
        width: size,
        height: size,
        background: "var(--card)",
        color: "var(--brand)",
        fontSize: size * 0.38,
      }}
    >
      {user?.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.photo}
          alt={user.name || "User avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        user?.name?.charAt(0).toUpperCase() || <User size={size * 0.5} />
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const auth = useContext(AuthContext) || {};
  const { user, logout } = auth;
  const authLoading = auth.loading ?? false;

  const [darkMode, setDarkMode] = useState(false);

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "writer"
      ? "/dashboard/writer"
      : "/dashboard/user";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDarkMode(next);
  };

  const handleLogout = () => {
    logout?.();
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--background-blur, rgba(255,255,255,0.85))" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
        boxShadow: scrolled ? "0 4px 20px -2px var(--shadow, rgba(0,0,0,0.03))" : "none",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <Logo />

          {/* Desktop Nav — Center Sliding Active State Indicator */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap"
                  style={{
                    color: active ? "var(--primary)" : "var(--brand)",
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                      style={{ backgroundColor: "var(--primary)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[var(--brand)]"
              aria-label="Toggle theme"
            >
              {mounted && darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {authLoading ? (
              <div className="w-20 h-9 rounded-xl animate-pulse bg-neutral-200 dark:bg-neutral-800" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={dashboardPath}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl text-sm font-medium border transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 shadow-sm"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--brand)",
                  }}
                >
                  <AvatarCircle user={user} size={28} />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown size={14} className="text-neutral-400" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  style={{ color: "var(--brand)" }}
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-[var(--brand)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="md:hidden absolute top-16 left-0 right-0 border-b bg-white dark:bg-neutral-950 px-4 py-4 flex flex-col gap-1 shadow-xl"
              style={{ borderColor: "var(--border)" }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: active ? "var(--primary)" : "var(--brand)",
                      backgroundColor: active ? "var(--card)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

              <div className="flex flex-col gap-2">
                {authLoading ? (
                  <div className="h-10 rounded-xl animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                ) : user ? (
                  <>
                    <Link
                      href={dashboardPath}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-neutral-50 dark:bg-neutral-900"
                      style={{ color: "var(--brand)" }}
                    >
                      <AvatarCircle user={user} size={28} />
                      <span className="truncate">{user.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center h-10 rounded-xl text-sm font-medium border"
                      style={{ borderColor: "var(--border)", color: "var(--brand)" }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center h-10 rounded-xl text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      Register
                    </Link>
                  </>
                )}

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium"
                  style={{ borderColor: "var(--border)", color: "var(--brand)" }}
                >
                  {mounted && darkMode ? (
                    <>
                      <Sun size={16} /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> Dark Mode
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}