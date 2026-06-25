"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, User, LogIn } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // temporary — auth later
  const user = null;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href)
                    ? "var(--primary)"
                    : "var(--brand)",
                  backgroundColor: isActive(link.href)
                    ? "var(--card)"
                    : "transparent",
                  fontWeight: isActive(link.href) ? "600" : "500",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard/user"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--brand)",
                  border: "1px solid var(--border)",
                }}
              >
                <User size={16} />
                Dashboard
              </Link>
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
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--white)",
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--brand)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t py-4 flex flex-col gap-1"
            style={{ borderColor: "var(--border)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium"
                style={{
                  color: isActive(link.href) ? "var(--primary)" : "var(--brand)",
                  backgroundColor: isActive(link.href)
                    ? "var(--card)"
                    : "transparent",
                  fontWeight: isActive(link.href) ? "600" : "500",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="flex flex-col gap-2 mt-3 pt-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {user ? (
                <Link
                  href="/dashboard/user"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--brand)",
                  }}
                >
                  <User size={16} />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-center justify-center"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--white)",
                    }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}