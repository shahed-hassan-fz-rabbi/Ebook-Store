import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
          <Loader2 size={48} className="animate-spin text-indigo-600 dark:text-indigo-500 relative z-10" />
        </div>
        <h2 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2em] animate-pulse">
          Loading Fable...
        </h2>
      </div>
    </div>
  );
}