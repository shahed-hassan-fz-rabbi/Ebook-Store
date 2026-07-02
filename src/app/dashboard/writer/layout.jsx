"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  DollarSign, 
  User, 
  LogOut, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Bookmark,
  Lock,
  AlertTriangle
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export default function WriterDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext) || {};

  // [Bug 1 Fixed] Secure boolean validation ensuring default state is unverified
  const isVerifiedWriter = Boolean(user?.isVerified); 

  const sidebarItems = [
    { label: "Overview", href: "/dashboard/writer", icon: LayoutDashboard },
    { label: "Verification", href: "/dashboard/writer/verification", icon: ShieldCheck },
    { label: "Manage Ebooks", href: "/dashboard/writer/manage-ebooks", icon: BookOpen, protected: true },
    { label: "Add Ebook", href: "/dashboard/writer/add-ebook", icon: PlusCircle, protected: true },
    { label: "Sales History", href: "/dashboard/writer/sales-history", icon: DollarSign },
    { label: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: Bookmark },
    { label: "My Profile", href: "/dashboard/writer/profile", icon: User },
  ];

  const isActive = (href) => pathname === href;

  // [Bug 2 & 3 Fixed] Loop-free route protection gateway without duplicate toast triggers
  useEffect(() => {
    const currentItem = sidebarItems.find(item => item.href === pathname);
    if (
      pathname !== "/dashboard/writer/verification" &&
      currentItem?.protected && 
      !isVerifiedWriter
    ) {
      toast.error("Please complete verification to access this feature.");
      router.push("/dashboard/writer/verification");
    }
  }, [pathname, isVerifiedWriter]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-900/20">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-neutral-950 border-r border-neutral-100 dark:border-neutral-800/60 p-5 shrink-0 justify-between min-h-screen sticky top-0">
        <div className="space-y-5">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-400 hover:text-orange-500 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={12} /> Back to Home
          </Link>

          {/* Writer Meta Info Identity Card */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-sm">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || "W"
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate leading-tight">
                {user?.name || "Writer Account"}
              </span>
              {/* [Fix 4] Dynamic visual color scheme reflection for Verification states */}
              <span className={`text-[10px] font-bold mt-0.5 ${isVerifiedWriter ? "text-emerald-500" : "text-amber-500"}`}>
                {isVerifiedWriter ? "Verified Writer ✓" : "Verification Pending"}
              </span>
            </div>
          </div>

          {/* [Bonus] Yellow Warning Indicator Badge for Unverified Writers */}
          {!isVerifiedWriter && (
            <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1">
              <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={12} /> Publishing Locked
              </p>
              <p className="text-[10px] text-neutral-400 font-medium leading-normal">
                Please complete your one-time verification payment to unlock.
              </p>
              <Link href="/dashboard/writer/verification" className="text-[10px] font-bold text-orange-500 hover:underline block pt-0.5">
                Verify Now →
              </Link>
            </div>
          )}

          {/* Nav Links Node */}
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isLocked = item.protected && !isVerifiedWriter;
              
              return (
                <Link
                  key={item.href}
                  href={isLocked ? "/dashboard/writer/verification" : item.href}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all group ${
                    isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{
                    color: active ? "var(--primary, #f97316)" : "var(--brand, #525252)",
                  }}
                  onClick={(e) => {
                    if (isLocked) {
                      e.preventDefault();
                      router.push("/dashboard/writer/verification");
                    }
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="writerSidebarGlow"
                      className="absolute inset-0 bg-orange-500/5 dark:bg-orange-500/10 rounded-xl border border-orange-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon size={16} className={active ? "text-orange-500" : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"} />
                    <span>{item.label}</span>
                  </div>

                  {/* [Fix 5 & 6] Dynamic rendering block for security lock status indicators */}
                  <div className="relative z-10 flex items-center gap-1">
                    {isLocked && <Lock size={13} className="text-neutral-400" />}
                    {active && <ChevronRight size={14} className="text-orange-500" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Bottom Action */}
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

      {/* Mobile Top Horizonal Menu Swipe View */}
      <div className="md:hidden w-full bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 overflow-x-auto flex px-4 pt-3 gap-2 scrollbar-none sticky top-0 z-40">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const isLocked = item.protected && !isVerifiedWriter;

          return (
            <Link
              key={item.href}
              href={isLocked ? "/dashboard/writer/verification" : item.href}
              className={`pb-2.5 px-2 flex items-center gap-1.5 text-xs font-bold whitespace-nowrap relative focus:outline-none ${
                isLocked ? "opacity-50" : ""
              }`}
              style={{ color: active ? "var(--primary)" : "var(--muted)" }}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault();
                  router.push("/dashboard/writer/verification");
                }
              }}
            >
              <Icon size={14} />
              {item.label}
              {isLocked && <Lock size={11} className="text-neutral-400" />}
              {active && (
                <motion.span
                  layoutId="writerMobileTabLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Viewport Render Frame */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>

    </div>
  );
}