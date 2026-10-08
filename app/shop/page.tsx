import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { img } from "@/lib/media";
import { PageHero } from "@/components/ui/PageHero";
import { CategoryTiles } from "@/components/home/CategoryTiles";

export const metadata: Metadata = {
  title: "Categories",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        image={img.pageShop}
        eyebrow="Aisles"
        title="Shop by category."
        description={`Browse all ${categories.length} categories. Click the category header to jump to every aisle, each with its related products listed.`}
      />
      <CategoryTiles title="All Categories" eyebrow={`${categories.length} aisles — click the header`} />
    </>
  );
}
