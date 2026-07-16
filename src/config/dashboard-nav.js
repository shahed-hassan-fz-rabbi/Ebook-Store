import {
  LayoutDashboard,
  ShoppingBag,
  Library,
  Bookmark,
  User,
  BookOpen,
  PlusCircle,
  TrendingUp,
  BadgeCheck,
  Users,
  Receipt,
  BarChart3,
} from "lucide-react";

export const dashboardNav = {
  reader: [
    { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
    {
      label: "Purchase History",
      href: "/dashboard/user/purchase-history",
      icon: ShoppingBag,
    },
    {
      label: "My Library",
      href: "/dashboard/user/purchased-ebooks",
      icon: Library,
    },
    {
      label: "Bookmarks",
      href: "/dashboard/user/bookmarks",
      icon: Bookmark,
    },
    { label: "Profile", href: "/dashboard/user/profile", icon: User },
  ],

  writer: [
    { label: "Overview", href: "/dashboard/writer", icon: LayoutDashboard },
    {
      label: "Manage Ebooks",
      href: "/dashboard/writer/manage-ebooks",
      icon: BookOpen,
    },
    {
      label: "Add Ebook",
      href: "/dashboard/writer/add-ebook",
      icon: PlusCircle,
    },
    {
      label: "Sales History",
      href: "/dashboard/writer/sales-history",
      icon: TrendingUp,
    },
    {
      label: "Bookmarks",
      href: "/dashboard/writer/bookmarks",
      icon: Bookmark,
    },
    {
      label: "Verification",
      href: "/dashboard/writer/verification",
      icon: BadgeCheck,
    },
    { label: "Profile", href: "/dashboard/writer/profile", icon: User },
  ],

  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    {
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      label: "Manage Ebooks",
      href: "/dashboard/admin/manage-ebooks",
      icon: BookOpen,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: Receipt,
    },
    {
      label: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
  ],
};


export const roleToPath = {
  reader: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};