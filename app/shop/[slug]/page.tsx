import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CategoryShop } from "@/components/shop/CategoryShop";
import { PageHero } from "@/components/ui/PageHero";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.slug);
  return { title: category?.name ?? "Category" };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <PageHero
        image={category.image}
        eyebrow={`${products.length} products in this category`}
        title={category.name}
        description={category.longDescription}
      />
      <Section>
        <Container>
          <CategoryShop category={category} products={products} />
        </Container>
      </Section>
    </>
  );
}
