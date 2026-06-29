"use client";

import { use } from "react";

import useSingleEbook from "@/hooks/useSingleEbook";

import EbookDetailsHero from "@/components/ebook/EbookDetailsHero";
import EbookDescription from "@/components/ebook/EbookDescription";
import EbookInformation from "@/components/ebook/EbookInformation";
import RelatedBooks from "@/components/ebook/RelatedBooks";
import ReviewSection from "@/components/ebook/ReviewSection";

export default function EbookDetailsPage({
  params,
}) {
  const { id } = use(params);

  const {
    ebook,
    isLoading,
  } = useSingleEbook(id);

  if (isLoading) {
    return (
      <div className="container py-32 text-center">
        Loading...
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="container py-32 text-center">
        Ebook Not Found
      </div>
    );
  }

  return (
    <>
      <EbookDetailsHero ebook={ebook} />

      <EbookDescription ebook={ebook} />

      <EbookInformation ebook={ebook} />

      <ReviewSection />

      <RelatedBooks />
    </>
  );
}