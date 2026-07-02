import EbookForm from "@/components/writer/EbookForm";

export const metadata = {
  title: "Add New Ebook | Fable Creator",
};

export default function AddEbookPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-50/50 dark:bg-neutral-900/30 p-4 md:p-8">
      <EbookForm mode="create" />
    </div>
  );
}