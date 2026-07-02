"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AddEbookPage() {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");

    if (!coverUrl) {
      setServerError("Please upload a cover image first.");
      return;
    }

    try {
      const payload = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        genre: data.genre,
        coverImage: coverUrl,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ebook/add`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      router.push("/writer/dashboard");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Failed to publish ebook. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--brand)" }}>
          Publish New Ebook
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          Fill out the details below to add a new book to the Fable platform.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-3 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-100 text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                Ebook Title
              </label>
              <input
                type="text"
                required
                {...register("title")}
                className="w-full h-11 px-4 rounded-xl border text-sm bg-[var(--card)] focus:outline-none"
                style={{ borderColor: "var(--border)", color: "var(--brand)" }}
                placeholder="e.g. The Midnight Library"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                Genre
              </label>
              <select
                required
                {...register("genre")}
                className="w-full h-11 px-4 rounded-xl border text-sm bg-[var(--card)] focus:outline-none cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--brand)" }}
              >
                <option value="Fiction">Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                required
                {...register("price")}
                className="w-full h-11 px-4 rounded-xl border text-sm bg-[var(--card)] focus:outline-none"
                style={{ borderColor: "var(--border)", color: "var(--brand)" }}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <ImageUpload
              value={coverUrl}
              onUploadSuccess={(url) => setCoverUrl(url)}
              label="Ebook Cover Image"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
            Description / Summary
          </label>
          <textarea
            required
            rows={5}
            {...register("description")}
            className="w-full p-4 rounded-xl border text-sm bg-[var(--card)] focus:outline-none resize-none"
            style={{ borderColor: "var(--border)", color: "var(--brand)" }}
            placeholder="Write a brief overview of your ebook..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all text-white shadow-sm cursor-pointer"
          style={{
            backgroundColor: "var(--primary)",
            opacity: isSubmitting ? 0.8 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving Ebook Data...
            </>
          ) : (
            "Publish Ebook"
          )}
        </button>
      </form>
    </div>
  );
}