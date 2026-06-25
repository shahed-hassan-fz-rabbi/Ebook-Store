"use client";

import Link from "next/link";
import { BookOpen, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <BookOpen size={22} color="white" />
              </div>

              <span
                className="text-2xl font-bold"
                style={{ color: "var(--brand)" }}
              >
                Fable
              </span>
            </Link>

            <p
              className="text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              Discover, share and read original ebooks from talented writers
              around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--brand)" }}
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link href="/">Home</Link>
              <Link href="/browse">Browse Ebooks</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--brand)" }}
            >
              Policies
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Support</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--brand)" }}
            >
              Newsletter
            </h3>

            <p
              className="text-sm mb-4"
              style={{ color: "var(--muted)" }}
            >
              Subscribe to receive updates on new ebooks.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-lg outline-none border"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "white",
                }}
              />

              <button
                className="px-4 rounded-r-lg flex items-center justify-center"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                }}
              >
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-5 mt-10 pt-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            © {year} Fable. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF size={18} />
            </Link>

            <Link href="#" aria-label="X">
              <FaXTwitter size={18} />
            </Link>

            <Link href="#" aria-label="Instagram">
              <FaInstagram size={18} />
            </Link>

            <Link href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}