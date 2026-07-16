import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-soft",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}