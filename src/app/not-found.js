import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-8xl font-extrabold tracking-tight text-primary">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-text">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/browse"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            <Search className="h-4 w-4" /> Browse Ebooks
          </Link>
        </div>
      </div>
    </div>
  );
}