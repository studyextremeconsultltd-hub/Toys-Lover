import type { Product } from "@/lib/types";

export function hasClearPrice(product: Pick<Product, "price" | "priceTBC">) {
  return !product.priceTBC && product.price > 0;
}

export function hasGoodPhoto(product: Pick<Product, "images">) {
  const src = product.images?.[0] ?? "";
  return src.startsWith("/images/products/");
}

export function isSquishyListing(product: Pick<Product, "categorySlug" | "name">) {
  return product.categorySlug === "squishies" || /squish|squeeze|needoh|dumpling/i.test(product.name);
}

/** Higher scores sort first: real photo and a clear price, with squishies boosted. */
export function rankScore(product: Product) {
  const photo = hasGoodPhoto(product);
  const price = hasClearPrice(product);
  let score = 0;
  if (photo && price) score += 100;
  else if (photo) score += 40;
  else if (price) score += 20;
  if (!photo) score -= 40;
  if (product.priceTBC || product.price <= 0) score -= 50;
  if (isSquishyListing(product)) score += 35;
  return score;
}

export function rankProducts<T extends Product>(items: T[]): T[] {
  return [...items].sort((a, b) => rankScore(b) - rankScore(a) || a.name.localeCompare(b.name));
}
