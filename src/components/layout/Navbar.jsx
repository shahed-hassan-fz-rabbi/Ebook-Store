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
    <Link href="/" className="flex items-center gap-2 group">
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: -5,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <BookOpen size={20} color="white" strokeWidth={2.5} />
      </motion.div>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: "var(--brand)" }}
      >
        Fable
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auth Context & Theme States
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  // Dynamic Dashboard Path Resolver
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Dark Mode Initial Check
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 249, 245, 0.95)"
          : "var(--background)",
        borderColor: "var(--border)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 20px var(--shadow)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-lg text-sm transition-all"
                style={{
                  color: isActive(link.href) ? "var(--primary)" : "var(--brand)",
                  fontWeight: isActive(link.href) ? "600" : "500",
                  backgroundColor: isActive(link.href) ? "var(--card)" : "transparent",
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: "var(--primary)",
                      transform: "translateX(-50%)",
                      bottom: "4px",
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border"
              style={{
                borderColor: "var(--border)",
                color: "var(--brand)",
              }}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold overflow-hidden"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                  }}
                >
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Dashboard Link */}
                <Link
                  href={dashboardPath}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--brand)",
                  }}
                >
                  <User size={16} />
                  {user.name}
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white flex items-center gap-2 text-sm font-medium transition-colors hover:bg-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ color: "var(--brand)" }}
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--white)",
                    }}
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--brand)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 rounded-lg text-sm"
                      style={{
                        color: isActive(link.href) ? "var(--primary)" : "var(--brand)",
                        backgroundColor: isActive(link.href) ? "var(--card)" : "transparent",
                        fontWeight: isActive(link.href) ? "600" : "500",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div
                  className="flex flex-col gap-2 mt-3 pt-3 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  {user ? (
                    <>
                      <Link
                        href={dashboardPath}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                        style={{
                          backgroundColor: "var(--card)",
                          color: "var(--brand)",
                        }}
                      >
                        <User size={16} />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white text-sm font-medium"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>

                      <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--brand)",
                        }}
                      >
                        {darkMode ? (
                          <>
                            <Sun size={18} />
                            Light Mode
                          </>
                        ) : (
                          <>
                            <Moon size={18} />
                            Dark Mode
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                        style={{ color: "var(--brand)" }}
                      >
                        <LogIn size={16} />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--white)",
                        }}
                      >
                        Register
                      </Link>
                      
                      {/* Mobile Theme Toggle (When Logged Out) */}
                      <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--brand)",
                        }}
                      >
                        {darkMode ? (
                          <>
                            <Sun size={18} />
                            Light Mode
                          </>
                        ) : (
                          <>
                            <Moon size={18} />
                            Dark Mode
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}