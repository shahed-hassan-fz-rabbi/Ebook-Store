"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg">

        <XCircle
          size={80}
          className="mx-auto text-red-500"
        />

        <h1 className="text-4xl font-bold mt-6">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mt-4">
          Your payment was cancelled.
        </p>

        <Link
          href="/browse"
          className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Browse Again
        </Link>

      </div>

    </div>
  );
}