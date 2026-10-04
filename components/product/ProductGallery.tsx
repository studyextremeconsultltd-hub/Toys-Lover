import { img } from "@/lib/media";
import { ToyPhoto } from "@/components/ui/ToyPhoto";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const src = images[0] || img.heroToys;

  return (
    <ToyPhoto
      src={src}
      alt={name}
      sizes="(min-width: 1024px) 40vw, 100vw"
      priority
      quality={72}
      fit="contain"
      className="aspect-square rounded-4xl shadow-soft ring-1 ring-coral-100"
    />
  );
}
