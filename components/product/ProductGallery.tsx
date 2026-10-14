import Image from "next/image";
import { img } from "@/lib/media";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const src = images[0] || img.heroToys;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-coral-100">
      <Image
        src={src}
        alt={name}
        fill
        priority
        sizes="(min-width: 1024px) 420px, 92vw"
        quality={88}
        className="object-contain object-center p-4 sm:p-5"
      />
    </div>
  );
}
