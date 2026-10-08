import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlowHeading({
  eyebrow,
  title,
  href,
  className,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  tone?: string;
  className?: string;
}) {
  const titleNode = (
    <h2 className="font-display text-2xl font-bold tracking-tight text-ink-800 sm:text-3xl">{title}</h2>
  );

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">{eyebrow}</p>
      ) : null}
      <div className="flex items-center gap-2">
        <ChevronLeft className="h-6 w-6 text-coral-400" aria-hidden />
        {href ? (
          <Link
            href={href}
            className="rounded-lg outline-none transition hover:text-coral-500 focus-visible:ring-2 focus-visible:ring-coral-400"
          >
            {titleNode}
          </Link>
        ) : (
          titleNode
        )}
        <ChevronRight className="h-6 w-6 text-coral-400" aria-hidden />
      </div>
    </div>
  );
}
