"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, getBoxDeal } from "@/lib/utils";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { Button } from "@/components/ui/Button";

export function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const router = useRouter();
  const wished = has(product.slug);
  const deal = getBoxDeal(product);
  const unitLabel = deal.soldAsBox ? "boxes" : "items";

  return (
    <div className="space-y-4">
      {deal.soldAsBox ? (
        <p className="rounded-2xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 ring-1 ring-teal-100">
          Single item {formatPrice(deal.singleItemPrice)} is less than the box — but the box of {deal.pieces} pcs
          for {formatPrice(deal.boxPrice)} is better value ({formatPrice(deal.perPiece)} each). Save{" "}
          {formatPrice(deal.savings)} vs buying singles. Sold as full box only.
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-ink-200 bg-white">
          <button
            type="button"
            className="p-3"
            aria-label={`Decrease ${unitLabel}`}
            onClick={() => setQty((value) => Math.max(1, value - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center font-display font-bold">{qty}</span>
          <button
            type="button"
            className="p-3"
            aria-label={`Increase ${unitLabel}`}
            onClick={() => setQty((value) => value + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm font-semibold text-ink-500">
          {qty} {deal.soldAsBox ? (qty === 1 ? "box" : "boxes") : qty === 1 ? "item" : "items"}
        </span>
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-semibold hover:border-coral-300"
        >
          <Heart className={wished ? "h-4 w-4 fill-coral-500 text-coral-500" : "h-4 w-4"} />
          {wished ? "Saved" : "Wishlist"}
        </button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" className="flex-1" onClick={() => addItem(product.slug, qty)}>
          {deal.soldAsBox ? "Add box to cart" : "Add to Cart"}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="flex-1"
          onClick={() => {
            addItem(product.slug, qty);
            router.push("/pay");
          }}
        >
          {deal.soldAsBox ? "Buy this box" : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}
