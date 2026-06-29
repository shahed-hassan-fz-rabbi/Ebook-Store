"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg">

        <CheckCircle2
          size={80}
          className="mx-auto text-green-500"
        />

        <h1 className="text-4xl font-bold mt-6">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for purchasing this ebook.
        </p>

        <div className="mt-8 flex gap-4 justify-center">

          <Link
            href="/dashboard/user/purchased-ebooks"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl"
          >
            My Books
          </Link>

          <Link
            href="/"
            className="border px-6 py-3 rounded-xl"
          >
            Home
          </Link>

        </div>

      </div>

    </div>
  );
}