import { categories } from "@/lib/data/categories";
import { getProductsByCategory, SQUISHY_CATEGORY_SLUGS } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { CategoryTilesClient } from "@/components/home/CategoryTilesClient";

const SQUISHY_SET = new Set<string>(SQUISHY_CATEGORY_SLUGS);

export function CategoryTiles({
  title = "Shop by Category",
  eyebrow = "Aisles",
}: {
  title?: string;
  eyebrow?: string;
}) {
  const aisles = categories
    .map((category) => {
      const products = getProductsByCategory(category.slug);
      return {
        category,
        count: products.length,
        productNames: products.slice(0, 3).map((product) => product.name),
      };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => {
      const aSquish = Number(SQUISHY_SET.has(a.category.slug));
      const bSquish = Number(SQUISHY_SET.has(b.category.slug));
      return bSquish - aSquish || b.count - a.count;
    });

  return (
    <Section id="all-categories" className="content-visibility-auto scroll-mt-28 bg-cream-50 py-12">
      <Container>
        <div className="mb-8">
          <GlowHeading eyebrow={eyebrow} title={title} href="/shop" />
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink-500">
            Squishies first, then every aisle — {aisles.length} categories ready to browse.
          </p>
        </div>
        <CategoryTilesClient aisles={aisles} />
      </Container>
    </Section>
  );
}
