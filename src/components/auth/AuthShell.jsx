"use client";

import Link from "next/link";
import { BookOpen, Quote } from "lucide-react";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold text-text">Fable</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-text">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 text-center text-sm">{footer}</div>}
        </div>
      </div>

      {/* Right — brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-primary-hover lg:flex lg:items-center lg:justify-center">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

        <div className="relative max-w-md px-12">
          <Quote className="h-12 w-12 text-white/30" />
          <p className="mt-6 text-2xl font-semibold leading-relaxed text-white">
            A reader lives a thousand lives before he dies. The man who never
            reads lives only one.
          </p>
          <p className="mt-6 text-sm font-medium text-white/70">
            — George R.R. Martin
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">Read</p>
              <p className="text-xs text-white/70">Anywhere</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Write</p>
              <p className="text-xs text-white/70">Publish free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Earn</p>
              <p className="text-xs text-white/70">Get paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}