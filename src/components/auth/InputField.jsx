"use client";

import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { label, type = "text", placeholder, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: "var(--brand)" }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3.5 outline-none text-sm border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
        style={{ color: "var(--brand)", background: "var(--background)" }}
        {...props}
      />
    </div>
  );
});

export default InputField;