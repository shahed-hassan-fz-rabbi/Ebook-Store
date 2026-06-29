"use client";

export default function SortDropdown({
  sort,
  setSort,
}) {
  return (
    <select
      value={sort}
      onChange={(e) =>
        setSort(e.target.value)
      }
      className="px-5 py-3 rounded-xl border bg-white"
    >
      <option value="">
        Most Popular
      </option>

      <option value="-createdAt">
        Newest
      </option>

      <option value="price">
        Price Low → High
      </option>

      <option value="-price">
        Price High → Low
      </option>
    </select>
  );
}