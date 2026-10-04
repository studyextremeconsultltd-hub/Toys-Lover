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
        description="Tap a card to open that aisle. Each one shows the toys, the age, and how many picks are inside."
      />
      <CategoryTiles title="Pick a lane" eyebrow={`${categories.length} aisles`} />
    </>
  );
}
