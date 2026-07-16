"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Lock } from "lucide-react";

import { readPurchasedBook } from "@/services/purchase.service";
import { normalizeEbook } from "@/lib/normalize";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function ReadPage({ params }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["read", id],
    queryFn: () => readPurchasedBook(id),
    enabled: !!user,
    retry: false,
  });

  if (authLoading || (user && isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <EmptyState
          icon={Lock}
          title="Please log in"
          description="You need to be logged in to read this book."
          action={
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (isError) {
    const status = error?.response?.status;
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <EmptyState
          icon={Lock}
          title={status === 403 ? "You don't own this book" : "Book unavailable"}
          description={
            status === 403
              ? "Purchase this ebook to unlock the full content."
              : "Something went wrong loading this book."
          }
          action={
            <Link href={`/ebooks/${id}`}>
              <Button>View Book</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const ebook = data?.data ? normalizeEbook(data.data) : null;
  if (!ebook) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Reading toolbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard/user/purchased-ebooks"
            className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Library
          </Link>
          <span className="flex items-center gap-2 text-sm text-muted">
            <BookOpen className="h-4 w-4 text-primary" />
            Reading
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-14">
        <span className="text-sm font-medium uppercase tracking-wide text-primary">
          {ebook.genre}
        </span>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-text">
          {ebook.title}
        </h1>
        <p className="mt-3 text-muted">by {ebook.author.name}</p>

        <div className="mt-10 border-t border-border pt-10">
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-text">
            {ebook.content || "No content available for this book."}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">— The End —</p>
          <Link href="/browse" className="mt-4 inline-block">
            <Button variant="outline">Discover more books</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}