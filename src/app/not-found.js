import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-7xl font-bold">
          404
        </h1>

        <p className="mt-4 text-gray-500">
          Page Not Found
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}