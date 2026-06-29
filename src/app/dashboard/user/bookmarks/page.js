"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import EbookCard from "@/components/ebook/EbookCard";

import {
  getBookmarks,
  removeBookmark,
} from "@/services/bookmark.service";

export default function BookmarksPage() {

  const [books, setBooks] = useState([]);

  const load = async () => {

    const res = await getBookmarks();

    setBooks(res.data || []);

  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id) => {

    await removeBookmark(id);

    toast.success("Removed");

    load();

  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        My Bookmarks
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {books.map((item) => (

          <div key={item._id}>

            <EbookCard ebook={item.ebook} />

            <button
              onClick={() => handleRemove(item._id)}
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}