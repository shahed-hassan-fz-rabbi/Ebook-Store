"use client";

import AuthBanner from "./AuthBanner";

export default function AuthLayout({ children }) {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg,#FFF8F3 0%,#FFF3EB 50%,#FFF8F3 100%)",
      }}
    >
      <div
        className="
        w-full
        max-w-7xl
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,.08)]
        grid
        lg:grid-cols-2
        "
      >
        <AuthBanner />

        <div
          className="
          flex
          items-center
          justify-center
          p-8
          lg:p-14
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}