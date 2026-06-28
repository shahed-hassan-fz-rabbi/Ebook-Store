"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Pencil,
} from "lucide-react";

export default function AuthBanner() {
  return (
    <div
      className="
      hidden
      lg:flex
      flex-col
      justify-between
      relative
      overflow-hidden
      "
      style={{
        background:
          "linear-gradient(180deg,#FFF8F3,#FFF2E8)",
      }}
    >
      {/* Decoration */}

      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full"
        style={{
          background: "rgba(249,115,22,.08)",
        }}
      />

      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
        style={{
          background: "rgba(249,115,22,.05)",
        }}
      />

      <div className="relative z-10 p-14">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "var(--primary)",
            }}
          >
            <BookOpen
              size={28}
              color="white"
            />
          </div>

          <div>

            <h2
              className="text-4xl font-extrabold"
              style={{
                color: "var(--brand)",
              }}
            >
              Fable
            </h2>

            <p
              style={{
                color: "var(--muted)",
              }}
            >
              Ebook Platform
            </p>

          </div>

        </Link>

        <div className="mt-20">

          <h1
            className="text-6xl font-black leading-tight"
            style={{
              color: "var(--brand)",
            }}
          >
            Your Reading
            <br />

            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Journey Starts
            </span>

            <br />

            Here
          </h1>

          <p
            className="mt-8 text-xl max-w-lg leading-9"
            style={{
              color: "var(--muted)",
            }}
          >
            Join thousands of readers and writers.
            Discover original ebooks from talented authors.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-5 mt-16">

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <BookOpen
              color="var(--primary)"
            />

            <h3 className="text-4xl font-bold mt-3">
              10K+
            </h3>

            <p>Ebooks</p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <Users
              color="var(--primary)"
            />

            <h3 className="text-4xl font-bold mt-3">
              50K+
            </h3>

            <p>Readers</p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <Pencil
              color="var(--primary)"
            />

            <h3 className="text-4xl font-bold mt-3">
              2K+
            </h3>

            <p>Writers</p>

          </div>

        </div>

      </div>

      {/* Bottom Illustration */}

      <div className="relative h-[300px]">

        <Image
          src="/images/auth/login-books.png"
          alt="books"
          fill
          className="object-contain object-bottom"
          priority
        />

      </div>

    </div>
  );
}