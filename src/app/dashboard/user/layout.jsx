"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  History, 
  Bookmark, 
  User, 
  LogOut, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

export default function UserDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Auth Context থেকে ইউজারের রিয়াল ডাটা এবং লগআউট ফাংশন নিয়ে আসা হলো
  const { user, logout } = useContext(AuthContext) || {};

  const sidebarItems = [
    { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
    { label: "My Library", href: "/dashboard/user/purchased-ebooks", icon: BookOpen },
    { label: "Purchase History", href: "/dashboard/user/purchase-history", icon: History },
    { label: "Bookmarks", href: "/dashboard/user/bookmarks", icon: Bookmark },
    { label: "My Profile", href: "/dashboard/user/profile", icon: User },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    if (logout) {
      await logout();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-900/20">
      
      {/* Premium Sidebar - Desktop Only */}
      <aside className="hidden md:flex flex-col w-68 bg-white dark:bg-neutral-950 border-r border-neutral-100 dark:border-neutral-800/60 p-5 shrink-0 justify-between min-h-screen sticky top-0">
        <div className="space-y-6">
          {/* Back Action */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-400 hover:text-orange-500 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={12} /> Back to Home
          </Link>

          {/* User Profile Card Inside Sidebar Header */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-sm">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate leading-tight">
                {user?.name || "Shahed Rahman"}
              </span>
              <span className="text-[10px] font-semibold text-orange-500 capitalize mt-0.5">
                {user?.role || "Reader"}
              </span>
              <span className="text-[10px] text-neutral-400 truncate mt-0.5">
                {user?.email || "shahed@gmail.com"}
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all group"
                  style={{
                    color: active ? "var(--primary, #f97316)" : "var(--brand, #525252)",
                  }}
                >
                  {/* Sliding Indicator Background */}
                  {active && (
                    <motion.span
                      layoutId="premiumSidebarGlow"
                      className="absolute inset-0 bg-orange-500/5 dark:bg-orange-500/10 rounded-xl border border-orange-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon size={16} className={active ? "text-orange-500" : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"} />
                    <span>{item.label}</span>
                  </div>

                  {active && <ChevronRight size={14} className="relative z-10 text-orange-500" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Bottom Section (Logout) */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
          >
            <LogOut size={16} className="text-neutral-400 group-hover:text-red-500 transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Scrollable Navigation Header */}
      <div className="md:hidden w-full bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 overflow-x-auto flex px-4 pt-3 gap-2 scrollbar-none sticky top-0 z-40">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="pb-2.5 px-2 flex items-center gap-1.5 text-xs font-bold whitespace-nowrap relative focus:outline-none"
              style={{ color: active ? "var(--primary)" : "var(--muted)" }}
            >
              <Icon size={14} />
              {item.label}
              {active && (
                <motion.span
                  layoutId="premiumMobileTabLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Dynamic Sub-page Render Container */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>

    </div>
  );
}