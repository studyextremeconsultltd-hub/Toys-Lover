import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AGE_GUIDES, getAgeGuide } from "@/lib/data/ages";
import { categories } from "@/lib/data/categories";
import { getProductsForAgeShelf } from "@/lib/data/products";
import { toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageHero } from "@/components/ui/PageHero";
import { GlowHeading } from "@/components/home/GlowHeading";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return AGE_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getAgeGuide(params.slug);
  return { title: guide ? `Toys for ${guide.label}` : "Shop by age" };
}

export default function AgePage({ params }: Props) {
  const guide = getAgeGuide(params.slug);
  if (!guide) notFound();

  const products = getProductsForAgeShelf(guide.range);
  const grouped = categories
    .map((category) => ({
      category,
      items: products.filter((product) => product.categorySlug === category.slug),
    }))
    .filter((row) => row.items.length);

  return (
    <>
      <PageHero
        image={guide.image}
        eyebrow={`Ages ${guide.label}`}
        title={guide.title}
        description={guide.usage}
      />
      <Section>
        <Container>
          <GlowHeading eyebrow="On this shelf" title={`Packed for ${guide.label}`} />
          <ul className="mt-6 flex flex-wrap gap-2">
            {guide.toys.map((toy) => (
              <li
                key={toy}
                className="rounded-full bg-white px-4 py-2 font-display text-sm font-extrabold text-ink-800 shadow-soft"
              >
                {toy}
              </li>
            ))}
          </ul>
          {grouped.length ? (
            <div className="mt-10 space-y-12">
              {grouped.map(({ category, items }) => (
                <div key={category.slug}>
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <h2 className="heading-glow-soft font-display text-2xl font-extrabold text-ink-900">
                      {toTitleCase(category.shortName)}
                    </h2>
                    <Link
                      href={`/shop/${category.slug}`}
                      className="font-display text-sm font-black uppercase tracking-wide text-coral-600"
                    >
                      Full aisle
                    </Link>
                  </div>
                  <ProductGrid products={items.slice(0, 3)} compact />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-3xl bg-white p-8 text-ink-600 shadow-soft">
              We’re restocking this age aisle. Browse categories while we pack the next boxes.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
