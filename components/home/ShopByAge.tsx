import Link from "next/link";
import Image from "next/image";
import { productShot } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { GlowHeading } from "@/components/home/GlowHeading";

const tiles = [
  { href: "/age/0-2", label: "0-12 Months", image: productShot("piano-fitness-gym") },
  { href: "/age/0-2", label: "1-2 Years", image: productShot("dino-world-musical-mat") },
  { href: "/age/3-5", label: "3-4 Years", image: productShot("dream-castle-playset") },
  { href: "/age/6-8", label: "5-7 Years", image: productShot("dino-expedition-build") },
  { href: "/shop/educational-stem", label: "STEM Toys", image: productShot("space-explorer-kit") },
  { href: "/shop/board-games", label: "Books & Puzzles", image: productShot("stage-quest-card-game") },
  { href: "/blog/gift-guide-ages-three-to-five", label: "Gifts & Bundles", image: productShot("mini-lit-christmas-trees") },
];

export function ShopByAge() {
  return (
    <section className="bg-white py-12">
      <Container>
        <GlowHeading title="Shop by Age" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {tiles.map((tile) => (
            <Link key={tile.label} href={tile.href} className="group">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-white shadow-soft ring-1 ring-cream-200">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="160px"
                  className="object-contain object-center bg-white p-0.5"
                />
                <span className="absolute inset-x-2 bottom-3 rounded-full bg-coral-500 px-2 py-1.5 text-center font-display text-[11px] font-bold leading-tight text-white shadow-soft sm:text-xs">
                  {tile.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
