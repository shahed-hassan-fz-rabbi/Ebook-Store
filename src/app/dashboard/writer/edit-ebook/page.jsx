"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  getSingleEbook,
  updateEbook,
} from "@/services/ebook.service";

export default function EditEbookPage() {
  const id =
    useSearchParams().get("id");

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState(null);

  useEffect(() => {
    const load = async () => {
      const res =
        await getSingleEbook(id);

      setFormData(res.data);
    };

    if (id) load();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateEbook(id, {
        ...formData,
        price: Number(
          formData.price
        ),
      });

      toast.success(
        "Updated Successfully"
      );

      router.push(
        "/dashboard/writer/manage-ebooks"
      );
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!formData)
    return <h2>Loading...</h2>;

  return (
    <div className="bg-white rounded-xl p-8 shadow">

      <h1 className="text-3xl font-bold mb-8">
        Edit Ebook
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="coverImage"
          value={
            formData.coverImage
          }
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="description"
          rows={4}
          value={
            formData.description
          }
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <textarea
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="input input-bordered"
          />

          <input
            name="language"
            value={
              formData.language
            }
            onChange={handleChange}
            className="input input-bordered"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered"
          />

        </div>

        <button
          disabled={loading}
          className="btn bg-orange-500 hover:bg-orange-600 text-white w-full"
        >
          {loading
            ? "Updating..."
            : "Update Ebook"}
        </button>

      </form>

    </div>
  );
}