import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { getProductsByCategory, SQUISHY_CATEGORY_SLUGS } from "@/lib/data/products";
import { toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { AisleCard } from "@/components/shop/AisleCard";

const SQUISHY_SET = new Set<string>(SQUISHY_CATEGORY_SLUGS);

export function CategoryTiles({
  title = "Shop by Category",
  eyebrow = "Aisles",
}: {
  title?: string;
  eyebrow?: string;
}) {
  const aisles = categories
    .map((category) => ({
      category,
      products: getProductsByCategory(category.slug),
    }))
    .filter((row) => row.products.length > 0)
    .sort((a, b) => {
      const aSquish = Number(SQUISHY_SET.has(a.category.slug));
      const bSquish = Number(SQUISHY_SET.has(b.category.slug));
      return bSquish - aSquish || b.products.length - a.products.length;
    });

  return (
    <Section id="all-categories" className="scroll-mt-28 bg-cream-50 py-12">
      <Container>
        <div className="mb-6">
          <GlowHeading eyebrow={eyebrow} title={title} href="/shop#all-categories" />
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-500">
            Squishies lead the shop. Click the header or any aisle — {aisles.length} active categories with
            products, each card listing what&apos;s inside.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {aisles.map(({ category, products }) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="rounded-full border border-cream-300 bg-white px-3 py-1.5 font-display text-xs font-bold text-ink-700 shadow-soft transition hover:border-coral-300 hover:text-coral-600"
            >
              {toTitleCase(category.shortName)}
              <span className="ml-1.5 text-ink-400">({products.length})</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aisles.map(({ category, products }, index) => (
            <AisleCard
              key={category.slug}
              category={category}
              count={products.length}
              productNames={products.map((product) => product.name)}
              priority={index < 4}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
