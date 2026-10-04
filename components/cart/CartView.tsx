"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice, toTitleCase } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ToyPhoto } from "@/components/ui/ToyPhoto";

export function CartView() {
  const { lines, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (lines.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl bg-white shadow-card">
        <div className="grid grid-cols-3">
          {[
            "/images/products/snuggle-puppy-plush.jpg",
            "/images/products/rocket-48-bubble-machine.jpg",
            "/images/products/rc-monster-truck.jpg",
          ].map((src) => (
            <div key={src} className="media-hover-frame relative aspect-square">
              <ToyPhoto src={src} alt="" sizes="33vw" className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="p-10 text-center">
          <p className="heading-glow font-display text-2xl font-extrabold text-ink-900">Your Cart Is Empty</p>
          <p className="mt-2 text-ink-500">Add a toy you would happily give at bedtime.</p>
          <Button href="/shop" className="mt-6">
            Shop Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <ul className="space-y-4">
        {lines.map(({ product, quantity }) => (
          <li
            key={product.slug}
            className="flex gap-4 rounded-3xl border border-ink-100 bg-white p-4 shadow-soft"
          >
            <Link href={`/product/${product.slug}`} className="media-hover-frame h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <ToyPhoto src={product.images[0]} alt={product.name} sizes="96px" className="h-24 w-24" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/product/${product.slug}`} className="heading-glow-soft font-display font-extrabold text-ink-900 hover:text-coral-600">
                {toTitleCase(product.name)}
              </Link>
              <p className="text-sm text-ink-400">{product.brand}</p>
              <p className="mt-1 font-semibold">{formatPrice(product.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-ink-200">
                  <button
                    type="button"
                    className="p-2"
                    aria-label="Decrease"
                    onClick={() => updateQuantity(product.slug, quantity - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-bold">{quantity}</span>
                  <button
                    type="button"
                    className="p-2"
                    aria-label="Increase"
                    onClick={() => updateQuantity(product.slug, quantity + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(product.slug)}
                  className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-coral-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-card">
        <h2 className="heading-glow font-display text-lg font-extrabold">Order Summary</h2>
        <p className="mt-4 flex justify-between text-sm">
          <span>{itemCount} items</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-2 flex justify-between text-sm text-ink-500">
          <span>Shipping</span>
          <span>{subtotal >= 60 ? "Free" : formatPrice(4.5)}</span>
        </p>
        <p className="mt-4 flex justify-between font-display text-lg font-extrabold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal + (subtotal >= 60 ? 0 : 4.5))}</span>
        </p>
        <Button href="/pay" size="lg" className="mt-6 w-full">
          Buy Online
        </Button>
      </aside>
    </div>
  );
}
