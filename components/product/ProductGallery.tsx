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
        sizes="(min-width: 1024px) 40vw, 92vw"
        quality={92}
        className="object-contain object-center p-3 sm:p-4"
      />
    </div>
  );
}
