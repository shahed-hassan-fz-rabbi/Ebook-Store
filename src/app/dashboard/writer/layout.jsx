"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard/writer",
  },
  {
    title: "Manage Ebooks",
    href: "/dashboard/writer/manage-ebooks",
  },
  {
    title: "Add Ebook",
    href: "/dashboard/writer/add-ebook",
  },
  {
    title: "Sales History",
    href: "/dashboard/writer/sales-history",
  },
  {
    title: "Verification",
    href: "/dashboard/writer/verification",
  },
];

export default function WriterLayout({
  children,
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Writer Dashboard
      </h1>

      <div className="grid lg:grid-cols-12 gap-8">

        <div className="lg:col-span-3">

          <div className="bg-white rounded-xl shadow p-5">

            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`block px-4 py-3 rounded-lg mb-2 transition ${
                  pathname === menu.href
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100"
                }`}
              >
                {menu.title}
              </Link>
            ))}

          </div>

        </div>

        <div className="lg:col-span-9">

          {children}

        </div>

      </div>

    </div>
  );
}