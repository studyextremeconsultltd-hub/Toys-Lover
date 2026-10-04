import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getSquishies } from "@/lib/data/products";
import { img } from "@/lib/media";
import { formatPrice, toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { Button } from "@/components/ui/Button";
import { ToyPhoto } from "@/components/ui/ToyPhoto";
import Image from "next/image";

export function SquishyLane() {
  const squishies = getSquishies().slice(0, 4);

  return (
    <Section className="bg-gradient-to-b from-[#FFE4F0] via-[#FFF1E6] to-[#FFE566]/30 py-8">
      <Container>
        <div className="mb-6 overflow-hidden rounded-[1.75rem] shadow-lift">
          <div className="media-hover-frame relative aspect-[16/8] min-h-[160px] sm:min-h-[200px]">
            <Image
              src={img.squishyLane}
              alt="Jumbo peach, strawberry, mango, and duck squishies"
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              quality={60}
              className="object-cover object-[center_75%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E85D8C]/85 via-[#E85D8C]/35 to-transparent" />
            <div className="relative z-10 flex h-full max-w-lg flex-col justify-center p-6 sm:p-10">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 font-display text-[11px] font-black uppercase tracking-wide text-[#E85D8C]">
                <Sparkles className="h-3.5 w-3.5" />
                Signature aisle
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-4xl">
                {toTitleCase("Squishies first. Always.")}
              </h2>
              <p className="mt-3 text-sm text-white/95 sm:text-base">
                Fruit, butter bricks, and jelly bears from our counter — each listed with its own
                photo so you can pick the squeeze.
              </p>
              <Button href="/shop" size="lg" variant="sun" className="mt-5 w-fit">
                Shop Squishies
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <GlowHeading eyebrow="Slow rise" title="This week’s squeezes" tone="pink" />
          <Link
            href="/shop"
            className="hidden rounded-full bg-white px-4 py-2 font-display text-sm font-black uppercase tracking-wide text-[#E85D8C] ring-2 ring-[#E85D8C] sm:inline-flex"
          >
            Full squishy wall
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {squishies.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="media-hover group overflow-hidden rounded-[1.4rem] bg-white shadow-card ring-2 ring-white"
            >
              <ToyPhoto
                src={product.images[0]}
                alt={product.name}
                sizes="(min-width: 640px) 22vw, 50vw"
                fit="contain"
                className="aspect-square"
              />
              <div className="p-3">
                <h3 className="font-display text-sm font-extrabold leading-snug text-ink-900">
                  {toTitleCase(product.name)}
                </h3>
                <p className="mt-1 font-display text-sm font-black text-[#E85D8C]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
