"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = forwardRef(function PasswordField(
  { label, placeholder, ...props },
  ref
) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: "var(--brand)" }}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3.5 pr-12 outline-none text-sm border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
          style={{ color: "var(--brand)", background: "var(--background)" }}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--muted)" }}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
});

export default PasswordField;