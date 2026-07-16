"use client";

import Link from "next/link";
import { BookOpen, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Browse Ebooks", href: "/browse" },
      { label: "Top Writers", href: "/#top-writers" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    categories: [
      { label: "Fiction", href: "/browse?category=fiction" },
      { label: "Science Fiction", href: "/browse?category=sci-fi" },
      { label: "Romance", href: "/browse?category=romance" },
      { label: "Thriller & Mystery", href: "/browse?category=mystery" },
      { label: "Self-Help", href: "/browse?category=self-help" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  };

  // Using raw SVGs to avoid missing brand icons in newer lucide-react versions
  const socialLinks = [
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      )
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      )
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      )
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    },
    {
      label: "GitHub",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      )
    }
  ];

  return (
    <footer 
      className="border-t mt-auto transition-colors duration-300"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <BookOpen size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight" style={{ color: "var(--brand)" }}>
                Fable
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Discover, read, and share original ebooks from talented writers around the world. Your next great adventure is just a click away.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--brand)" }}>Stay Updated</p>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3" style={{ color: "var(--muted)" }} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-11 pl-10 pr-12 rounded-xl text-sm border outline-none transition-colors"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border)", color: "var(--brand)" }}
                />
                <button 
                  type="submit" 
                  className="absolute right-1 w-9 h-9 rounded-lg flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: "var(--brand)" }}>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm font-medium transition-colors hover:underline underline-offset-4"
                    style={{ color: "var(--muted)", textDecorationColor: "var(--primary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: "var(--brand)" }}>
              Top Categories
            </h3>
            <ul className="space-y-4">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm font-medium transition-colors hover:underline underline-offset-4"
                    style={{ color: "var(--muted)", textDecorationColor: "var(--primary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: "var(--brand)" }}>
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm transition-colors"
                  style={{ backgroundColor: "var(--background)", borderColor: "var(--border)", color: "var(--muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--card)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--background)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
              Email: support@fable.com
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            © {currentYear} Fable. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-xs font-semibold transition-colors"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--brand)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}