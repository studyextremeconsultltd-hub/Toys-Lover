import { categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { AisleCard } from "@/components/shop/AisleCard";

export function CategoryTiles({
  title = "Shop by Category",
  eyebrow = "Aisles",
}: {
  title?: string;
  eyebrow?: string;
}) {
  return (
    <Section className="bg-cream-50 py-12">
      <Container>
        <div className="mb-8">
          <GlowHeading eyebrow={eyebrow} title={title} />
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-500">
            Pick the kind of play first. Each card shows the aisle photo, the age it is packed for, and how many toys are waiting.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <AisleCard
              key={category.slug}
              category={category}
              count={getProductsByCategory(category.slug).length}
              priority={index < 4}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
