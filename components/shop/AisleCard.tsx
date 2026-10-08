import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { cn, toTitleCase } from "@/lib/utils";

const accentChip: Record<Category["accent"], string> = {
  coral: "bg-coral-50 text-coral-700",
  sky: "bg-sky-50 text-sky-700",
  mint: "bg-mint-50 text-mint-800",
  sun: "bg-sun-50 text-[#9A5B00]",
};

export function AisleCard({
  category,
  count,
  productNames = [],
  className,
  priority,
}: {
  category: Category;
  count?: number;
  productNames?: string[];
  className?: string;
  priority?: boolean;
}) {
  const mentioned = productNames.slice(0, 4);

  return (
    <Link
      href={`/shop/${category.slug}`}
      className={cn(
        "media-hover group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-soft",
        className,
      )}
    >
      <span className={cn("h-1.5 w-full bg-coral-500")} />
      <div className="media-hover-frame relative aspect-[4/3] bg-white">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 80vw"
          quality={90}
          className="object-contain object-center bg-white"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p
          className={cn(
            "w-fit rounded-full px-2.5 py-0.5 font-display text-[10px] font-black uppercase tracking-wide",
            accentChip[category.accent],
          )}
        >
          {typeof count === "number" ? `${count} product${count === 1 ? "" : "s"}` : "Category"}
        </p>
        <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-ink-900 sm:text-lg">
          {toTitleCase(category.shortName)}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-500">{category.description}</p>
        {mentioned.length ? (
          <ul className="mt-3 space-y-1 border-t border-cream-200 pt-3">
            {mentioned.map((name) => (
              <li key={name} className="truncate text-xs font-semibold text-ink-600">
                · {toTitleCase(name)}
              </li>
            ))}
            {typeof count === "number" && count > mentioned.length ? (
              <li className="text-[11px] font-bold uppercase tracking-wide text-coral-600">
                +{count - mentioned.length} more
              </li>
            ) : null}
          </ul>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-black uppercase tracking-wide text-coral-600">
          Shop aisle
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
