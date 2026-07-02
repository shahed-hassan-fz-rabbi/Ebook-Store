"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md w-full">
        <XCircle size={64} className="text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-8">
          Your payment was not completed. No charges were made.
        </p>
        <Link href="/browse">
          <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
            Back to Browse
          </button>
        </Link>
      </div>
    </div>
  );
}