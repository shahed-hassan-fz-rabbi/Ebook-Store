import { cn } from "@/lib/utils";

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-card-alt/80 dark:bg-border/40",
        className
      )}
    />
  );
}