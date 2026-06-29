"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import useEBooks from "@/hooks/useEBooks";

import {
  deleteEbook,
} from "@/services/ebook.service";

export default function ManageEbooks() {
  const {
    ebooks,
    refetch,
    isLoading,
  } = useEBooks();

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Delete this ebook?"
      )
    )
      return;

    try {
      await deleteEbook(id);

      toast.success(
        "Deleted Successfully"
      );

      refetch();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  if (isLoading)
    return <h2>Loading...</h2>;

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          My Ebooks
        </h2>

        <Link
          href="/dashboard/writer/add-ebook"
          className="bg-orange-500 text-white px-5 py-3 rounded-lg"
        >
          + Add Ebook
        </Link>

      </div>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Title
              </th>

              <th>Genre</th>

              <th>Price</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {ebooks.map((book) => (
              <tr
                key={book._id}
                className="border-b"
              >
                <td className="p-3">
                  {book.title}
                </td>

                <td>{book.genre}</td>

                <td>
                  ${book.price}
                </td>

                <td>
                  {book.status}
                </td>

                <td>

                  <div className="flex gap-3 justify-center">

                    <Link
                      href={`/dashboard/writer/edit-ebook?id=${book._id}`}
                      className="text-blue-500"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          book._id
                        )
                      }
                      className="text-red-500"
                    >
                      Delete
                    </button>

                  </div>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}