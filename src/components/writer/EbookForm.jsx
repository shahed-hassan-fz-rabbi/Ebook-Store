"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, X, BookOpen } from "lucide-react";

import { uploadImage } from "@/lib/uploadImage";
import { genres } from "@/config/genres";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function EbookForm({ initial, onSubmit, submitting, mode = "create" }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [content, setContent] = useState(initial?.content || "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [genre, setGenre] = useState(initial?.genre || "Fiction");
  const [language, setLanguage] = useState(initial?.language || "English");
  const [status, setStatus] = useState(initial?.status || "published");
  const [cover, setCover] = useState(initial?.coverImage || "");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setCover(url);
      toast.success("Cover uploaded");
    } catch {
      toast.error("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!content.trim()) e.content = "Content is required";
    if (price === "" || Number(price) < 0) e.price = "Enter a valid price";
    if (!cover) e.cover = "Cover image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit({
      title,
      description,
      content,
      price: Number(price),
      genre,
      language,
      status,
      coverImage: cover,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="mb-3 text-sm font-medium text-text">Cover Image</p>

        {cover ? (
          <div className="relative w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt="Cover"
              className="aspect-[3/4] w-full rounded-xl border border-border object-cover"
            />
            <button
              type="button"
              onClick={() => setCover("")}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex aspect-[3/4] w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background transition-colors hover:border-primary">
            {uploading ? (
              <span className="text-xs text-muted">Uploading...</span>
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted" />
                <span className="text-xs text-muted">Upload cover</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}

        {errors.cover && (
          <p className="mt-2 text-xs text-danger">{errors.cover}</p>
        )}
      </div>

      <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
        <Input
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="The Silent Storm"
          error={errors.title}
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="A short summary readers will see..."
            className="w-full rounded-xl border border-border bg-background p-4 text-sm text-text outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-danger">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Full Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="The full text of your ebook..."
            className="w-full rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-text outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.content && (
            <p className="mt-1.5 text-xs text-danger">{errors.content}</p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Price (USD)"
            name="price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="10"
            error={errors.price}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none focus:border-primary"
            >
              {genres.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="English"
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none focus:border-primary"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" size="lg" loading={submitting}>
          <BookOpen className="h-4 w-4" />
          {mode === "create" ? "Publish Ebook" : "Save Changes"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/dashboard/writer/manage-ebooks")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}