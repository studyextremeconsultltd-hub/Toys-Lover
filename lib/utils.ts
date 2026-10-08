export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SMALL_CAPS = /^(UK|USA|STEM|FAQ|PCI|GB|AM|PM)$/i;

export function toTitleCase(value: string) {
  return value.replace(/[A-Za-zÀ-ÿ’']+/g, (word) => {
    if (SMALL_CAPS.test(word)) return word.toUpperCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}

/** Pieces shown in the product box (explicit field or carton feature line). */
export function getPiecesPerBox(product: {
  piecesPerBox?: number;
  stock?: number;
  features?: string[];
}): number | undefined {
  if (typeof product.piecesPerBox === "number" && product.piecesPerBox > 0) {
    return product.piecesPerBox;
  }
  const fromFeature = product.features
    ?.map((feature) => feature.match(/Carton pack:\s*(\d+)\s*pcs/i)?.[1])
    .find(Boolean);
  if (fromFeature) return Number(fromFeature);
  return undefined;
}

