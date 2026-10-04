import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              icon,
              index < Math.round(value) ? "fill-sun-400 text-sun-400" : "text-cream-200",
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-ink-500">
        {value.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : null}
      </span>
    </div>
  );
}
