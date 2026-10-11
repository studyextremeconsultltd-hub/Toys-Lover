import Image from "next/image";
import { cn } from "@/lib/utils";
import { isFramedPhoto, isShopPhoto, isStudioPhoto } from "@/lib/media";

export function ToyPhoto({
  src,
  alt,
  sizes,
  quality = 100,
  priority,
  className,
  fit,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  fit?: "contain" | "cover";
}) {
  const framed = isFramedPhoto(src);
  const studio = isStudioPhoto(src);
  const shopFloor = isShopPhoto(src);
  const mode = fit ?? (framed || studio ? "cover" : "cover");
  const image = src || "/images/hero-play.jpg";
  const useProductShot = mode === "cover" || framed || studio;

  return (
    <div
      className={cn(
        "media-hover-frame relative overflow-hidden",
        "bg-white",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={
          useProductShot
            ? "product-shot h-full w-full bg-white"
            : shopFloor
              ? "object-cover object-center"
              : "object-cover object-center"
        }
      />
    </div>
  );
}
