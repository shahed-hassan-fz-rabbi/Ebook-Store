"use client";

export default function SortDropdown({ sort, setSort }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="px-5 py-3 rounded-xl bg-white border outline-none text-sm"
      style={{ borderColor: "var(--border)", color: "var(--brand)" }}
    >
      <option value="-createdAt">Newest First</option>
      <option value="createdAt">Oldest First</option>
      <option value="-averageRating">Highest Rated</option>
      <option value="-totalSales">Most Popular</option>
      <option value="price">Price Low → High</option>
      <option value="-price">Price High → Low</option>
    </select>
  );
}