import { img } from "@/lib/media";
import { ToyPhoto } from "@/components/ui/ToyPhoto";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const src = images[0] || img.heroToys;

  return (
    <ToyPhoto
      src={src}
      alt={name}
      sizes="(min-width: 1024px) 48vw, 100vw"
      priority
      quality={100}
      fit="cover"
      className="aspect-square min-h-[18rem] rounded-4xl bg-white shadow-soft ring-1 ring-coral-100 sm:min-h-[24rem] lg:min-h-[28rem] [&_img]:h-full [&_img]:w-full"
    />
  );
}
