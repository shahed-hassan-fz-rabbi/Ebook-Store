"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Mail, Send, Check } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse Ebooks" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Support" },
];

const socialLinks = [
  { href: "#", label: "Facebook", icon: FaFacebookF },
  { href: "#", label: "X", icon: FaXTwitter },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to newsletter API
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <BookOpen size={20} color="white" />
              </div>

              <span
                className="text-xl font-bold"
                style={{ color: "var(--brand)" }}
              >
                Fable
              </span>
            </Link>

            <p
              className="text-sm leading-6"
              style={{ color: "var(--muted)" }}
            >
              Discover, share and read original ebooks from talented writers
              around the world.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3
              className="text-sm font-semibold mb-4 tracking-wide uppercase"
              style={{ color: "var(--brand)" }}
            >
              Quick Links
            </h3>

            <ul className="flex flex-col gap-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:opacity-100"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label="Policies">
            <h3
              className="text-sm font-semibold mb-4 tracking-wide uppercase"
              style={{ color: "var(--brand)" }}
            >
              Policies
            </h3>

            <ul className="flex flex-col gap-3 text-sm">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 tracking-wide uppercase"
              style={{ color: "var(--brand)" }}
            >
              Newsletter
            </h3>

            <p className="text-sm mb-4 leading-6" style={{ color: "var(--muted)" }}>
              Subscribe to receive updates on new ebooks.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-lg outline-none border text-sm transition-colors"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--primary)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 rounded-lg flex items-center justify-center shrink-0 transition-transform active:scale-95"
                style={{
                  backgroundColor: subscribed
                    ? "var(--green, #16a34a)"
                    : "var(--primary)",
                  color: "white",
                }}
              >
                {subscribed ? <Check size={18} /> : <Send size={16} />}
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-xs" style={{ color: "var(--primary)" }}>
                Subscribed — thanks for joining.
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 mt-12 pt-6 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm text-center md:text-left" style={{ color: "var(--muted)" }}>
            © {year} Fable. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary)";
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}