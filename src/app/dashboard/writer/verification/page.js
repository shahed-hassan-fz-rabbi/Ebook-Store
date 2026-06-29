"use client";

import { ShieldCheck, BadgeCheck } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow p-10">

        <div className="flex items-center gap-3 mb-6">

          <ShieldCheck
            size={40}
            className="text-green-500"
          />

          <h1 className="text-3xl font-bold">
            Writer Verification
          </h1>

        </div>

        <div className="rounded-xl border p-6">

          <div className="flex items-center gap-3">

            <BadgeCheck
              size={30}
              className="text-blue-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                Verification Status
              </h2>

              <p className="text-green-600 font-medium">
                Verified Writer
              </p>

            </div>

          </div>

          <hr className="my-6" />

          <p className="text-gray-600 leading-8">

            Your writer account has been verified.

            <br />

            You can publish ebooks, manage your library,
            track sales and receive payments.

          </p>

        </div>

      </div>

    </div>
  );
}