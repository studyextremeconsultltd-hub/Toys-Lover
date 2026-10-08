"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { formatPrice, getBoxDeal, toTitleCase } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { WishButton } from "@/components/product/ProductCardActions";
import { useCart } from "@/lib/context/CartContext";

const PAGE = 6;

function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={`cart-pulse mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 font-display text-sm font-bold text-white shadow-soft transition-[background-color,transform] duration-300 ease-out ${
        added ? "bg-teal-600" : "bg-coral-500 hover:bg-coral-600"
      }`}
    >
      {added ? <Check className="cart-icon h-4 w-4" /> : <ShoppingBag className="cart-icon h-4 w-4" />}
      {added ? "Added" : "Add box"}
    </button>
  );
}

function BestSellerCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const deal = getBoxDeal(product);
  const badge = deal.soldAsBox ? "Full box" : product.compareAtPrice ? "Sale" : product.isNew ? "New" : "Bestseller";
  const badgeClass = deal.soldAsBox
    ? "bg-teal-600 text-white"
    : product.compareAtPrice
      ? "bg-coral-500 text-white"
      : product.isNew
        ? "bg-teal-600 text-white"
        : "bg-sun-400 text-ink-800";

  return (
    <article className="bestseller-card flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-cream-200 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 14vw, (min-width: 640px) 28vw, 46vw"
            quality={92}
            loading="lazy"
            className="bestseller-photo bg-white object-contain object-center"
          />
        </Link>
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
        >
          {badge}
        </span>
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
          {deal.pieces} pcs · {formatPrice(deal.boxPrice)}
        </span>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
          {category?.shortName ?? product.categorySlug}
        </p>
        <h3 className="mt-1 font-display text-sm font-bold leading-snug text-ink-800">
          <Link href={`/product/${product.slug}`} className="transition-colors duration-200 hover:text-coral-500">
            {toTitleCase(product.name)}
          </Link>
        </h3>
        <div className="mt-1">
          <Rating value={product.rating} />
        </div>
        <div className="mt-auto space-y-1 border-t border-cream-200 pt-2 text-[11px]">
          <div className="flex justify-between gap-2">
            <span className="font-semibold text-ink-500">Single</span>
            <span className="font-bold text-ink-700">{formatPrice(deal.singleItemPrice)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="font-semibold text-ink-500">Box ({deal.pieces} pcs)</span>
            <span className="font-display text-base font-bold text-coral-500">{formatPrice(deal.boxPrice)}</span>
          </div>
        </div>
        {deal.soldAsBox ? (
          <p className="mt-1 text-[10px] font-semibold text-teal-800">
            Buy the box — save {formatPrice(deal.savings)}
          </p>
        ) : null}
        <AddToCartButton slug={product.slug} />
      </div>
    </article>
  );
}

export function BestSellers({ products }: { products: Product[] }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(products.length / PAGE));

  const goTo = (next: number) => {
    setPage((next + pages) % pages);
  };

  const visible = useMemo(() => {
    const start = page * PAGE;
    return products.slice(start, start + PAGE);
  }, [page, products]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous bestsellers"
        onClick={() => goTo(page - 1)}
        className="absolute -left-3 top-[32%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-coral-500 shadow-card ring-1 ring-cream-200 transition hover:bg-cream-50 hover:text-coral-600 lg:grid"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {visible.map((product) => (
          <BestSellerCard key={`${page}-${product.slug}`} product={product} />
        ))}
      </div>
      <button
        type="button"
        aria-label="Next bestsellers"
        onClick={() => goTo(page + 1)}
        className="absolute -right-3 top-[32%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-coral-500 shadow-card ring-1 ring-cream-200 transition hover:bg-cream-50 hover:text-coral-600 lg:grid"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous bestsellers"
          onClick={() => goTo(page - 1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-coral-500 shadow-soft ring-1 ring-cream-200 transition lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: pages })
            .slice(0, 8)
            .map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show bestsellers page ${index + 1}`}
                aria-current={index === page ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  index === page ? "w-6 bg-coral-500" : "w-2 bg-cream-300"
                }`}
              />
            ))}
        </div>
        <button
          type="button"
          aria-label="Next bestsellers"
          onClick={() => goTo(page + 1)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-coral-500 shadow-soft ring-1 ring-cream-200 transition lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
