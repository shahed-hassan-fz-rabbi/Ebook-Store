"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BookOpen,
  User,
  Star,
  TrendingUp,
  Globe,
  Calendar,
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

import { getSingleEbook } from "@/services/ebook.service";
import { checkout, getMyPurchases } from "@/services/purchase.service";
import { normalizeEbook } from "@/lib/normalize";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import BookmarkButton from "@/components/ebook/BookmarkButton";

export default function EbookDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ebook", id],
    queryFn: () => getSingleEbook(id),
  });

  const { data: purchaseData } = useQuery({
    queryKey: ["my-purchases"],
    queryFn: getMyPurchases,
    enabled: !!user,
  });

  const ebook = data?.data ? normalizeEbook(data.data) : null;

  const purchases = Array.isArray(purchaseData?.data) ? purchaseData.data : [];

  const alreadyPurchased = purchases.some(
    (p) => (p.ebook?._id || p.ebook) === id
  );

  const isOwnBook = user && ebook && user._id === ebook.author.id;

  const { mutate: buyNow, isPending } = useMutation({
    mutationFn: () => checkout(id),
    onSuccess: (res) => {
      const url = res?.data;
      if (typeof url === "string" && url.startsWith("http")) {
        window.location.href = url;
      } else {
        toast.error("Could not start checkout.");
      }
    },
    onError: (err) => {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (status === 401) {
        toast.error("Please log in to purchase.");
        router.push("/login");
        return;
      }
      toast.error(msg || "Checkout failed. Please try again.");
    },
  });

  const handleBuy = () => {
    if (!user) {
      toast.error("Please log in to purchase.");
      router.push("/login");
      return;
    }
    buyNow();
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-64" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !ebook) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <EmptyState
          icon={BookOpen}
          title="Ebook not found"
          description="This book may have been removed or the link is incorrect."
          action={
            <Link href="/browse">
              <Button>Browse Ebooks</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full py-14">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Link
          href="/browse"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
          <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card-alt shadow-soft">
              {ebook.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ebook.cover}
                  alt={ebook.title}
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center">
                  <BookOpen className="h-14 w-14 text-muted/30" />
                </div>
              )}
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {ebook.genre}
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-text lg:text-5xl">
              {ebook.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {ebook.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {ebook.averageRating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                {ebook.totalSales} sold
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
              {ebook.description}
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Globe className="h-3.5 w-3.5" /> Language
                </p>
                <p className="mt-1 font-semibold text-text">{ebook.language}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Calendar className="h-3.5 w-3.5" /> Published
                </p>
                <p className="mt-1 font-semibold text-text">
                  {ebook.createdAt
                    ? new Date(ebook.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="mr-2 text-4xl font-bold tracking-tight text-text">
                ${ebook.price.toFixed(2)}
              </span>

              {alreadyPurchased ? (
                <Link href={`/read/${ebook.id}`}>
                  <Button size="lg" variant="secondary">
                    <CheckCircle className="h-4 w-4" /> Read Now
                  </Button>
                </Link>
              ) : isOwnBook ? (
                <Button size="lg" disabled>
                  This is your book
                </Button>
              ) : (
                <Button size="lg" onClick={handleBuy} loading={isPending}>
                  <ShoppingCart className="h-4 w-4" /> Buy Now
                </Button>
              )}

              <BookmarkButton ebookId={ebook.id} />
            </div>

            {alreadyPurchased && (
              <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-success">
                <CheckCircle className="h-4 w-4" /> You own this ebook
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}