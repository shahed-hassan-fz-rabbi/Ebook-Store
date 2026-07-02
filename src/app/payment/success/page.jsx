"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md w-full">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-8">
          Your ebook has been added to your library. Happy reading!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard/user">
            <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
              Go to My Library
            </button>
          </Link>
          <Link href="/browse">
            <button className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition">
              Browse More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}