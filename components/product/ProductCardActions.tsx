"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { Button } from "@/components/ui/Button";

export function WishButton({ slug }: { slug: string }) {
  const { toggle, has } = useWishlist();
  const wished = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={wished}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-500 shadow-sm hover:text-coral-500"
    >
      <Heart className={wished ? "h-4 w-4 fill-coral-500 text-coral-500" : "h-4 w-4"} />
    </button>
  );
}

export function AddButton({ slug, label = "Add" }: { slug: string; label?: string }) {
  const { addItem } = useCart();

  return (
    <Button type="button" size="sm" className="w-full" onClick={() => addItem(slug)}>
      <ShoppingBag className="h-4 w-4" />
      {label}
    </Button>
  );
}
