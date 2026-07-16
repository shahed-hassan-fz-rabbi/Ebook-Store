"use client";

import Skeleton from "@/components/ui/Skeleton";

export default function DataTable({ columns, rows, isLoading, empty }) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="space-y-3 p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return empty || null;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id || i}
              className="border-b border-border last:border-0 transition-colors hover:bg-card-alt/50"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-text">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}