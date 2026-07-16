import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-primary text-white">
          <BookOpen className="h-7 w-7" />
        </span>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-card-alt">
          <div className="h-full w-1/2 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}