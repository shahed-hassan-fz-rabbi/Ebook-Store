"use client";

import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  BadgeDollarSign,
} from "lucide-react";

export default function WriterDashboard() {
  return (
    <div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl p-6 shadow">

          <BookOpen
            size={40}
            className="text-orange-500"
          />

          <h2 className="mt-3 text-2xl font-bold">
            My Ebooks
          </h2>

          <Link
            href="/dashboard/writer/manage-ebooks"
            className="text-orange-500"
          >
            View →
          </Link>

        </div>

        <div className="bg-white rounded-xl p-6 shadow">

          <PlusCircle
            size={40}
            className="text-orange-500"
          />

          <h2 className="mt-3 text-2xl font-bold">
            Add Ebook
          </h2>

          <Link
            href="/dashboard/writer/add-ebook"
            className="text-orange-500"
          >
            Create →
          </Link>

        </div>

        <div className="bg-white rounded-xl p-6 shadow">

          <BadgeDollarSign
            size={40}
            className="text-orange-500"
          />

          <h2 className="mt-3 text-2xl font-bold">
            Sales History
          </h2>

          <Link
            href="/dashboard/writer/sales-history"
            className="text-orange-500"
          >
            View →
          </Link>

        </div>

      </div>

    </div>
  );
}