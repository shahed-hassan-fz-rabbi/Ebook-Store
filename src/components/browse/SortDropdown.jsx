"use client";

export default function SortDropdown() {
  return (
    <select
      className="
      px-5
      py-3
      rounded-xl
      bg-white
      border
      outline-none
      "
      style={{
        borderColor: "var(--border)",
      }}
    >
      <option>Most Popular</option>
      <option>Newest</option>
      <option>Highest Rated</option>
      <option>Price Low → High</option>
      <option>Price High → Low</option>
    </select>
  );
}