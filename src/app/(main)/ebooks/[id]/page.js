"use client";

import { useParams } from "next/navigation";

import useSingleEbook from "@/hooks/useSingleEbook";

import EbookDetailsHero from "@/components/ebook/EbookDetailsHero";
import EbookDescription from "@/components/ebook/EbookDescription";
import EbookInformation from "@/components/ebook/EbookInformation";
import ReviewSection from "@/components/ebook/ReviewSection";
import RelatedBooks from "@/components/ebook/RelatedBooks";

export default function EbookDetailsPage() {
  const { id } = useParams();

  const { ebook, isLoading } = useSingleEbook(id);

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