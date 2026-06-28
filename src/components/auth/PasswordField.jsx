"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  label,
  icon,
  className = "",
  ...props
}) {

  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">

      <label
        className="block text-sm font-semibold"
        style={{ color: "var(--brand)" }}
      >
        {label}
      </label>

      <div className="relative">

        <div
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
          pointer-events-none
          "
          style={{ color: "var(--muted)" }}
        >
          {icon}
        </div>

        <input
          type={show ? "text" : "password"}
          {...props}
          className={`
            w-full
            h-14
            rounded-xl
            border
            pl-12
            pr-12
            bg-white
            text-[15px]
            outline-none
            transition-all
            duration-200
            focus:ring-4
            ${className}
          `}
          style={{
            borderColor: "#E8E8E8",
          }}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-500
          hover:text-orange-500
          transition
          "
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>

      </div>

    </div>
  );
}