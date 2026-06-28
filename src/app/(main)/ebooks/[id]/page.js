import mockEbooks from "@/data/mockEbooks";

import EbookDetailsHero from "@/components/ebook/EbookDetailsHero";
import EbookDescription from "@/components/ebook/EbookDescription";
import EbookInformation from "@/components/ebook/EbookInformation";
import ReviewSection from "@/components/ebook/ReviewSection";
import RelatedBooks from "@/components/ebook/RelatedBooks";

export default async function EbookDetailsPage({ params }) {

  const { id } = await params;

  const ebook = mockEbooks.find(
    (book) => book._id === id
  );

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