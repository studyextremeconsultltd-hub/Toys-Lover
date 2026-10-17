"use client";

import { useState } from "react";
import Image from "next/image";
import { img } from "@/lib/media";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const photos = images.length ? images : [img.heroToys];
  const [active, setActive] = useState(0);
  const src = photos[active] ?? photos[0];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-coral-100">
        <Image
          src={src}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 420px, 92vw"
          quality={88}
          className="object-contain object-center bg-white p-1.5 sm:p-2.5"
        />
      </div>
      {photos.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Photo ${index + 1} of ${name}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white ring-2 ${
                index === active ? "ring-coral-500" : "ring-cream-200"
              }`}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-contain object-center bg-white p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
