"use client";

export default function Pagination({
  meta,
  page,
  setPage,
}) {
  if (
    !meta ||
    meta.totalPage <= 1
  )
    return null;

  return (
    <div className="flex justify-center gap-3">

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="btn btn-outline"
      >
        Previous
      </button>

      <span className="px-4 py-2">

        {page} / {meta.totalPage}

      </span>

      <button
        disabled={
          page === meta.totalPage
        }
        onClick={() =>
          setPage(page + 1)
        }
        className="btn btn-outline"
      >
        Next
      </button>

    </div>
  );
}