import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { getCategory } from "@/lib/data/categories";
import {
  getSquishies,
  getSquishyCount,
  SQUISHY_CATEGORY_SLUGS,
  getProductsByCategory,
} from "@/lib/data/products";
import { img } from "@/lib/media";
import { toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";

export function SquishyLane() {
  const allSquishies = getSquishies();
  const total = getSquishyCount();
  const featured = allSquishies.slice(0, 12);

  return (
    <Section id="squishies" className="scroll-mt-28 bg-gradient-to-b from-[#FFE4F0] via-[#FFF8F0] to-cream-50 py-10">
      <Container>
        <div className="mb-8 overflow-hidden rounded-[1.75rem] shadow-lift">
          <div className="media-hover-frame relative aspect-[16/7] min-h-[180px] sm:min-h-[220px]">
            <Image
              src={img.squishyLane}
              alt="Toy Bloom squishies — fruit, food and sensory jars"
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              quality={90}
              className="object-cover object-[center_70%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E85D8C]/90 via-[#E85D8C]/45 to-transparent" />
            <div className="relative z-10 flex h-full max-w-xl flex-col justify-center p-6 sm:p-10">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 font-display text-[11px] font-black uppercase tracking-wide text-[#E85D8C]">
                <Sparkles className="h-3.5 w-3.5" />
                Main product · {total} squishies
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Squishies first.
              </h2>
              <p className="mt-3 text-sm text-white/95 sm:text-base">
                Sold as full boxes — each listing shows the item, total pieces in the box, and a competitive
                box price. Buy the box, not singles.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/shop/fruit-squishies" size="lg" variant="sun" className="w-fit">
                  Shop Fruit Squishies
                </Button>
                <Button href="#squishy-wall" size="lg" variant="outline" className="w-fit border-white bg-white/15 text-white hover:bg-white hover:text-[#E85D8C]">
                  See the wall
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {SQUISHY_CATEGORY_SLUGS.map((slug) => {
            const category = getCategory(slug);
            const count = getProductsByCategory(slug).length;
            if (!category || !count) return null;
            return (
              <Link
                key={slug}
                href={`/shop/${slug}`}
                className="rounded-full border border-[#E85D8C]/30 bg-white px-3 py-1.5 font-display text-xs font-bold text-ink-700 shadow-soft transition hover:border-[#E85D8C] hover:text-[#E85D8C]"
              >
                {toTitleCase(category.shortName)}
                <span className="ml-1.5 text-ink-400">({count})</span>
              </Link>
            );
          })}
        </div>

        <div id="squishy-wall" className="mb-6 scroll-mt-28">
          <GlowHeading
            eyebrow={`${featured.length} of ${total} on the wall`}
            title="Squishy bestsellers"
            href="/shop/fruit-squishies"
          />
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink-500">
            Every card names the item in the box, the total piece count, and the competitive box price —
            grab the full box for the best deal.
          </p>
        </div>

        <ProductGrid products={featured} />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/shop/fruit-squishies" size="lg">
            Fruit Squishies
          </Button>
          <Button href="/shop/food-squishies" size="lg" variant="outline">
            Food Squishies
          </Button>
          <Button href="/shop/sensory-jars" size="lg" variant="sun">
            Sensory Jars
          </Button>
        </div>
      </Container>
    </Section>
  );
}
