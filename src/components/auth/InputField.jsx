"use client";

export default function InputField({
  label,
  icon,
  className = "",
  ...props
}) {
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
          {...props}
          className={`
            w-full
            h-14
            rounded-xl
            border
            pl-12
            pr-4
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

      </div>

    </div>
  );
}