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

export type BoxDeal = {
  pieces: number;
  /** Competitive price for the full box. */
  boxPrice: number;
  /** Price if bought as one single item — always lower than boxPrice. */
  singleItemPrice: number;
  /** Cost of buying every piece as singles (usually higher than boxPrice). */
  singlesTotal: number;
  /** Money saved by choosing the box over singles. */
  savings: number;
  /** Effective price per piece inside the box. */
  perPiece: number;
  soldAsBox: boolean;
  /** @deprecated use singlesTotal */
  singlesCompare?: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

/**
 * Box-first pricing:
 * - listed `price` = competitive full-box price
 * - single item price is always lower than the box price
 * - per-piece in the box is lower than the single item price (so the box wins)
 */
export function getBoxDeal(product: {
  price: number;
  compareAtPrice?: number;
  piecesPerBox?: number;
  features?: string[];
  slug?: string;
}): BoxDeal {
  const pieces = getPiecesPerBox(product) ?? 1;
  const soldAsBox = pieces > 1;
  const boxPrice = product.price;

  if (!soldAsBox) {
    return {
      pieces: 1,
      boxPrice,
      singleItemPrice: boxPrice,
      singlesTotal: boxPrice,
      savings: 0,
      perPiece: boxPrice,
      soldAsBox: false,
    };
  }

  const perPiece = boxPrice / pieces;

  // Prefer compareAtPrice when it is a valid single: below box, above per-piece-in-box.
  const compareAt = product.compareAtPrice;
  const compareOk =
    typeof compareAt === "number" && compareAt > perPiece && compareAt < boxPrice;

  let singleItemPrice: number;
  if (compareOk) {
    singleItemPrice = compareAt;
  } else {
    // ~40% above box-per-piece, but always strictly under the box price.
    singleItemPrice = Math.min(boxPrice - 0.01, perPiece * 1.4);
    if (singleItemPrice <= perPiece) {
      singleItemPrice = Math.min(boxPrice - 0.01, perPiece + 0.4);
    }
    // Prefer friendly .99 endings when it still respects single < box.
    const friendly = Math.floor(singleItemPrice) + 0.99;
    if (friendly > perPiece && friendly < boxPrice) {
      singleItemPrice = friendly;
    } else {
      singleItemPrice = roundMoney(singleItemPrice);
    }
  }

  // Hard rules: single < box, and single > per-piece-in-box.
  if (singleItemPrice >= boxPrice) {
    singleItemPrice = roundMoney(Math.max(perPiece + 0.2, boxPrice * 0.75));
    if (singleItemPrice >= boxPrice) singleItemPrice = roundMoney(boxPrice - 0.5);
  }
  if (singleItemPrice <= perPiece) {
    singleItemPrice = roundMoney(Math.min(boxPrice - 0.01, perPiece * 1.25));
  }

  const singlesTotal = roundMoney(singleItemPrice * pieces);
  const savings = roundMoney(Math.max(0, singlesTotal - boxPrice));

  return {
    pieces,
    boxPrice,
    singleItemPrice,
    singlesTotal,
    savings,
    perPiece,
    soldAsBox: true,
    singlesCompare: singlesTotal,
  };
}

