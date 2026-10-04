import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  inverted = false,
  className,
}: {
  compact?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={SITE_NAME}
      className={cn(
        "logo-glow group relative shrink-0",
        inverted && "logo-glow-inverted",
        className,
      )}
    >
      <Image
        src={img.logoBloom}
        alt={`${SITE_NAME} — Trendy Toys for Happy Kids`}
        width={180}
        height={180}
        priority
        quality={92}
        sizes={compact ? "80px" : inverted ? "128px" : "112px"}
        className={cn(
          "block object-cover object-center",
          compact && "h-14 w-14 sm:h-16 sm:w-16",
          !compact && !inverted && "h-24 w-24 sm:h-28 sm:w-28",
          inverted && "h-[6.5rem] w-[6.5rem] sm:h-32 sm:w-32",
        )}
      />
    </Link>
  );
}
