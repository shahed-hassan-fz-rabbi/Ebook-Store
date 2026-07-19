"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, User, LogIn, LogOut, Moon, Sun,
  ChevronDown, LayoutDashboard, Bookmark, ShoppingBag,
  BookMarked, PlusCircle, BarChart2, Users, Settings,
  Shield, FileText, Search, Bell, PenTool
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const DROPDOWN_ITEMS = {
  reader: [
    { label: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
    { label: "My Library", href: "/dashboard/user/purchased-ebooks", icon: BookMarked },
    { label: "Bookmarks", href: "/dashboard/user/bookmarks", icon: Bookmark },
    { label: "Purchase History", href: "/dashboard/user/purchase-history", icon: ShoppingBag },
    { label: "Profile", href: "/dashboard/user/profile", icon: User },
  ],
  writer: [
    { label: "Dashboard", href: "/dashboard/writer", icon: LayoutDashboard },
    { label: "Manage Ebooks", href: "/dashboard/writer/manage-ebooks", icon: BookMarked },
    { label: "Add Ebook", href: "/dashboard/writer/add-ebook", icon: PlusCircle },
    { label: "Sales History", href: "/dashboard/writer/sales-history", icon: BarChart2 },
    { label: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: Bookmark },
    { label: "Profile", href: "/dashboard/writer/profile", icon: User },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
    { label: "Manage Ebooks", href: "/dashboard/admin/manage-ebooks", icon: BookMarked },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: FileText },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart2 },
  ],
};

function BookMark({ hovered }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <motion.path
        d="M10 3.2C8.1 1.7 5.4 1 3 1.4C1.9 1.6 1 2.6 1 3.7v9.6c0 1 .9 1.7 1.9 1.5c2.2-.4 4.7.2 6.4 1.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: hovered ? -6 : 0, x: hovered ? -0.6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ transformOrigin: "10px 3px" }}
      />
      <motion.path
        d="M10 3.2C11.9 1.7 14.6 1 17 1.4c1.1.2 2 1.2 2 2.3v9.6c0 1-.9 1.7-1.9 1.5c-2.2-.4-4.7.2-6.4 1.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: hovered ? 6 : 0, x: hovered ? 0.6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ transformOrigin: "10px 3px" }}
      />
      <line x1="10" y1="3.4" x2="10" y2="16.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function Logo() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileTap={{ scale: 0.94 }}
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <BookMark hovered={hovered} />
      </motion.div>
      <span
        className="text-[22px] italic tracking-tight whitespace-nowrap hidden sm:block font-[family-name:var(--font-serif)]"
        style={{ color: "var(--brand)" }}
      >
        Fable
      </span>
    </Link>
  );
}

function AvatarCircle({ user, size = 32 }) {
  return (
    <div
      className="relative rounded-full flex items-center justify-center font-semibold overflow-hidden shrink-0 border"
      style={{
        width: size,
        height: size,
        background: "var(--primary)",
        borderColor: "var(--border)",
        color: "white",
        fontSize: size * 0.38,
      }}
    >
      {user?.photo ? (
        <Image
          src={user.photo}
          alt={user.name || "User Avatar"}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        user?.name?.charAt(0).toUpperCase() || <User size={size * 0.5} />
      )}
    </div>
  );
}

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();

  const roleKey =
    user?.role === "admin" ? "admin"
    : user?.role === "writer" ? "writer"
    : "reader";

  const items = DROPDOWN_ITEMS[roleKey] || DROPDOWN_ITEMS.reader;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg text-sm font-medium border transition-all"
        style={{
          borderColor: open ? "var(--primary)" : "var(--border)",
          color: "var(--brand)",
          backgroundColor: open ? "var(--card)" : "transparent",
        }}
      >
        <AvatarCircle user={user} size={28} />
        <span className="max-w-[90px] truncate hidden sm:block">
          {user?.name?.split(" ")[0]}
        </span>
        <ChevronDown
          size={14}
          className="transition-transform duration-200"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--muted)",
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 rounded-xl border shadow-xl overflow-hidden z-50 p-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.12)",
            }}
          >
            <div
              className="px-4 py-3 border-b flex items-center gap-3 mb-2 rounded-lg"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
            >
              <AvatarCircle user={user} size={36} />
              <div className="flex flex-col min-w-0">
                <p
                  className="text-[14px] font-bold truncate italic font-[family-name:var(--font-serif)]"
                  style={{ color: "var(--brand)" }}
                >
                  {user.name}
                </p>
                <p className="text-[10px] truncate uppercase mt-0.5 font-bold tracking-wide" style={{ color: "var(--primary)" }}>
                  {roleKey}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {items.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3.5 px-4 py-2.5 text-sm rounded-lg transition-all font-medium"
                  style={{ color: "var(--brand)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--card)";
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.paddingLeft = "1.25rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--brand)";
                    e.currentTarget.style.paddingLeft = "1rem";
                  }}
                >
                  <Icon size={16} className="shrink-0" style={{ color: "var(--primary)" }} />
                  {label}
                </Link>
              ))}
            </div>

            <div className="border-t mt-2 pt-1.5" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3.5 px-4 py-2.5 text-sm text-red-500 font-bold rounded-lg transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.06)";
                  e.currentTarget.style.paddingLeft = "1.25rem";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.paddingLeft = "1rem";
                }}
              >
                <LogOut size={16} className="shrink-0" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const { user, logout, loading: authLoading } = useAuth();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse", href: "/browse" },
    ...(user
      ? [
          {
            label: "Dashboard",
            href:
              user.role === "admin"
                ? "/dashboard/admin"
                : user.role === "writer"
                ? "/dashboard/writer"
                : "/dashboard/user",
          },
        ]
      : []),
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--card)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
        boxShadow: scrolled ? "0 4px 20px -2px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div 
        className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3 lg:gap-6"
        style={{ paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}
      >
        <Logo />

        <form onSubmit={handleSearch} className="hidden lg:flex items-center relative flex-1 max-w-sm">
          <div className="w-full relative flex items-center bg-transparent border-b transition-colors"
            style={{ borderColor: searchFocused ? "var(--primary)" : "var(--border)" }}
          >
            <div className="flex items-center gap-2 w-full h-9 px-1">
              <Search
                size={15}
                className="shrink-0 transition-colors"
                style={{ color: searchFocused ? "var(--primary)" : "var(--muted)" }}
              />
              <input
                type="text"
                placeholder="Search the shelf…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full h-full text-sm outline-none bg-transparent"
                style={{ color: "var(--brand)" }}
              />
            </div>
          </div>
        </form>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
                style={{ color: active ? "var(--primary)" : "var(--brand)" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          {user?.role === "reader" && (
            <Link
              href="/register"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 border"
              style={{ backgroundColor: "var(--card)", color: "var(--primary)", borderColor: "var(--border)" }}
            >
              <PenTool size={13} />
              Become a Writer
            </Link>
          )}

          <button
            className="relative p-2 rounded-lg transition-colors border"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--brand)" }}
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
          </button>

          <div className="w-px h-5 mx-0.5" style={{ backgroundColor: "var(--border)" }} />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors border"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--brand)" }}
            aria-label="Toggle theme"
          >
            {mounted && darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {authLoading ? (
            <div className="w-24 h-9 rounded-lg animate-pulse ml-2" style={{ backgroundColor: "var(--card)" }} />
          ) : user ? (
            <div className="ml-2">
              <UserDropdown user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-2">
              <Link
                href="/login"
                className="text-sm font-medium relative"
                style={{ color: "var(--brand)" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: "var(--brand)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
          >
           
            <div 
              className="py-5 pb-12 flex flex-col gap-2"
              style={{ paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}
            >
              <form onSubmit={handleSearch} className="mb-4">
                <div className="w-full relative flex items-center bg-transparent border-b transition-colors"
                  style={{ borderColor: searchFocused ? "var(--primary)" : "var(--border)" }}
                >
                  <div className="flex items-center gap-2 w-full h-9 px-1">
                    <Search
                      size={15}
                      className="shrink-0 transition-colors"
                      style={{ color: searchFocused ? "var(--primary)" : "var(--muted)" }}
                    />
                    <input
                      type="text"
                      placeholder="Search the shelf…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      className="w-full h-full text-sm outline-none bg-transparent"
                      style={{ color: "var(--brand)" }}
                    />
                  </div>
                </div>
              </form>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                      style={{ color: active ? "var(--primary)" : "var(--brand)" }}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--primary)" }} />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-px my-3" style={{ backgroundColor: "var(--border)" }} />

              {authLoading ? (
                <div className="h-10 rounded-lg animate-pulse" style={{ backgroundColor: "var(--card)" }} />
              ) : user ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 py-2.5 mb-2 border-b" style={{ borderColor: "var(--border)" }}>
                    <AvatarCircle user={user} size={36} />
                    <div>
                      <p className="text-sm font-bold italic font-[family-name:var(--font-serif)]" style={{ color: "var(--brand)" }}>
                        {user.name}
                      </p>
                      <p className="text-[10px] uppercase font-bold tracking-wide mt-0.5" style={{ color: "var(--primary)" }}>
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {user.role === "reader" && (
                    <Link
                      href="/register"
                      className="flex items-center gap-3 py-2.5 text-sm font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      <PenTool size={15} />
                      Become a Writer
                    </Link>
                  )}

                  {(DROPDOWN_ITEMS[user?.role === "admin" ? "admin" : user?.role === "writer" ? "writer" : "reader"] || []).map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 py-2.5 text-sm font-medium"
                      style={{ color: "var(--brand)" }}
                    >
                      <Icon size={15} style={{ color: "var(--primary)" }} />
                      {label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-2.5 text-sm font-bold text-red-500 mt-2 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-10 rounded-lg text-sm font-semibold border"
                    style={{ borderColor: "var(--border)", color: "var(--brand)" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center h-10 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Register
                  </Link>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 h-10 w-full rounded-xl border text-sm font-bold transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--brand)", backgroundColor: "var(--card)" }}
                >
                  {mounted && darkMode ? <Sun size={15} className="shrink-0" /> : <Moon size={15} className="shrink-0" />}
                  {mounted && darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}