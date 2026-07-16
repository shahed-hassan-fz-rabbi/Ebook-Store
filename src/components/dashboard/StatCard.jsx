import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    secondary: "bg-secondary/10 text-secondary",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            tones[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-text">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}