"use client";

import useEBooks from "@/hooks/useEBooks";
import EbookCard from "../ebook/EbookCard";

const EbookGrid = () => {
  const { ebooks, isLoading } = useEBooks();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!ebooks.length) {
    return (
      <div className="text-center py-20">
        No ebooks found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ebooks.map((ebook) => (
        <EbookCard
          key={ebook._id}
          ebook={ebook}
        />
      ))}
    </div>
  );
};

export default EbookGrid;