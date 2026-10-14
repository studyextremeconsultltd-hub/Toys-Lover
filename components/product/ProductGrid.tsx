import type { Product } from "@/lib/types";
import { ProductTile } from "@/components/product/ProductTile";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({
  products,
  compact = false,
}: {
  products: Product[];
  compact?: boolean;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
        No toys match those filters yet. Try a wider price, brand, or theme.
      </p>
    );
  }

  const Card = compact ? ProductTile : ProductCard;

  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4 xl:grid-cols-5"
          : "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
      }
    >
      {products.map((product) => (
        <Card key={product.slug} product={product} />
      ))}
    </div>
  );
}
