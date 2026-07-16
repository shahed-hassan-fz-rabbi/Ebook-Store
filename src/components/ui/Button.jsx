"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-soft disabled:opacity-60",
  secondary:
    "bg-secondary text-white hover:brightness-110 disabled:opacity-60",
  outline:
    "border border-border bg-card text-text hover:border-primary hover:text-primary",
  ghost: "text-text hover:bg-card-alt",
  danger: "bg-danger text-white hover:brightness-110 disabled:opacity-60",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all active:scale-[0.98] disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}