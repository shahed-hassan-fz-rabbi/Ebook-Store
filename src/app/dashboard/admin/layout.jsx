"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  User, 
  LogOut, 
  ArrowLeft,
  ChevronRight,
  Shield
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loader } = useContext(AuthContext) || {};

  const sidebarItems = [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
    { label: "Manage Ebooks", href: "/dashboard/admin/manage-ebooks", icon: BookOpen },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    { label: "My Profile", href: "/dashboard/admin/profile", icon: User },
  ];

  const isActive = (href) => pathname === href;

  useEffect(() => {
    if (!loader) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin") {
        toast.error("Unauthorized access. Admin privileges required.");
        router.replace("/");
      }
    }
  }, [user, loader, router]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      router.push("/");
    }
  };

  // Prevent rendering unauthorized UI while loading or validating
  if (loader || !user || user.role !== "admin") {
    return null; 
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-900/20">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-neutral-950 border-r border-neutral-100 dark:border-neutral-800/60 p-5 shrink-0 justify-between min-h-screen sticky top-0">
        <div className="space-y-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-400 hover:text-indigo-500 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={12} /> Back to Platform
          </Link>

          {/* Admin Identity Card */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
              <Shield size={48} />
            </div>
            <div className="relative w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center overflow-hidden border border-indigo-200 dark:border-indigo-800 shrink-0 shadow-sm z-10">
              {user?.photo ? (
                <Image 
                  src={user.photo} 
                  alt={user.name || "Admin"} 
                  fill 
                  className="object-cover" 
                  sizes="40px"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase() || "A"
              )}
            </div>
            <div className="flex flex-col min-w-0 relative z-10">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate leading-tight">
                {user?.name || "System Admin"}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-0.5">
                <Shield size={10} /> Superuser
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                {user?.email || "admin@fable.com"}
              </span>
            </div>
          </div>

          {/* Navigation Directory */}
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
                    color: active ? "var(--primary, #4f46e5)" : "var(--brand, #525252)",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="adminSidebarGlow"
                      className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-xl border border-indigo-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon size={16} className={active ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"} />
                    <span>{item.label}</span>
                  </div>

                  {active && <ChevronRight size={14} className="relative z-10 text-indigo-600 dark:text-indigo-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Panel */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
          >
            <LogOut size={16} className="text-neutral-400 group-hover:text-red-500 transition-colors" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden w-full bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 overflow-x-auto flex px-4 pt-3 gap-2 scrollbar-none sticky top-0 z-40">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="pb-2.5 px-2 flex items-center gap-1.5 text-xs font-bold whitespace-nowrap relative focus:outline-none"
              style={{ color: active ? "#4f46e5" : "var(--muted)" }}
            >
              <Icon size={14} />
              {item.label}
              {active && (
                <motion.span
                  layoutId="adminMobileTabLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-indigo-600"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>

    </div>
  );
}