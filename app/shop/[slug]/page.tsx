import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { getBrands, getProductsByCategory, getThemes } from "@/lib/data/products";
import { categoryStudio } from "@/lib/media";
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
  const brands = Array.from(new Set(products.map((product) => product.brand))).sort();
  const themes = Array.from(new Set(products.map((product) => product.theme))).sort();

  return (
    <>
      <PageHero
        image={categoryStudio[category.slug] ?? category.image}
        eyebrow={`${products.length} products in this category`}
        title={category.name}
        description={category.longDescription}
      />
      <Section>
        <Container>
          <CategoryShop
            category={category}
            products={products}
            brands={brands.length ? brands : getBrands()}
            themes={themes.length ? themes : getThemes()}
          />
        </Container>
      </Section>
    </>
  );
}
