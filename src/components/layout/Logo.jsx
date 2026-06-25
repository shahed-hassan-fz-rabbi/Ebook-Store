import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <BookOpen size={20} color="white" strokeWidth={2.5} />
      </div>
      <span
        className="text-xl font-800 tracking-tight"
        style={{ color: "var(--brand)" }}
      >
        Fable
      </span>
    </Link>
  );
}