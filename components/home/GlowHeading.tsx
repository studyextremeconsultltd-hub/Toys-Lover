import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlowHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  tone?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">{eyebrow}</p>
      ) : null}
      <div className="flex items-center gap-2">
        <ChevronLeft className="h-6 w-6 text-coral-400" aria-hidden />
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink-800 sm:text-3xl">{title}</h2>
        <ChevronRight className="h-6 w-6 text-coral-400" aria-hidden />
      </div>
    </div>
  );
}
