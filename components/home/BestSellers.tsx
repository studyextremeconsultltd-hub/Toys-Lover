"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, toTitleCase } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { WishButton } from "@/components/product/ProductCardActions";
import { useCart } from "@/lib/context/CartContext";

const PAGE = 6;

const ease = [0.22, 1, 0.36, 1] as const;

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
      className={`cart-pulse mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 font-display text-sm font-bold text-white shadow-soft transition-[background-color,transform] duration-500 ease-out ${
        added ? "bg-teal-600" : "bg-coral-500 hover:bg-coral-600"
      }`}
    >
      {added ? <Check className="cart-icon h-4 w-4" /> : <ShoppingBag className="cart-icon h-4 w-4" />}
      {added ? "Added" : "Add to cart"}
    </button>
  );
}

function BestSellerCard({ product, index }: { product: Product; index: number }) {
  const badge = product.compareAtPrice ? "Sale" : product.isNew ? "New" : "Bestseller";
  const badgeClass = product.compareAtPrice
    ? "bg-coral-500 text-white"
    : product.isNew
      ? "bg-teal-600 text-white"
      : "bg-sun-400 text-ink-800";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease }}
      className="bestseller-card flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-cream-200"
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 14vw, (min-width: 640px) 28vw, 46vw"
            quality={76}
            className="bestseller-photo bg-white p-0.5"
          />
        </Link>
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
        >
          {badge}
        </span>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">{product.ageRange}</p>
        <h3 className="mt-1 font-display text-sm font-bold leading-snug text-ink-800">
          <Link href={`/product/${product.slug}`} className="transition-colors duration-300 hover:text-coral-500">
            {toTitleCase(product.name)}
          </Link>
        </h3>
        <div className="mt-1">
          <Rating value={product.rating} />
        </div>
        <p className="mt-auto pt-2 font-display text-base font-bold text-coral-500">
          {formatPrice(product.price)}
          {product.compareAtPrice ? (
            <span className="ml-2 text-sm font-semibold text-ink-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
        <AddToCartButton slug={product.slug} />
      </div>
    </motion.article>
  );
}

export function BestSellers({ products }: { products: Product[] }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const pages = Math.max(1, Math.ceil(products.length / PAGE));

  const goTo = (next: number) => {
    const wrapped = (next + pages) % pages;
    setDirection(wrapped === 0 && page === pages - 1 ? 1 : wrapped === pages - 1 && page === 0 ? -1 : wrapped > page ? 1 : -1);
    setPage(wrapped);
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
        className="absolute -left-3 top-[32%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-coral-500 shadow-card ring-1 ring-cream-200 transition duration-300 hover:bg-cream-50 hover:text-coral-600 lg:grid"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -36 }}
            transition={{ duration: 0.5, ease }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {visible.map((product, index) => (
              <BestSellerCard key={product.slug} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        type="button"
        aria-label="Next bestsellers"
        onClick={() => goTo(page + 1)}
        className="absolute -right-3 top-[32%] z-10 hidden h-12 w-12 place-items-center rounded-full bg-white text-coral-500 shadow-card ring-1 ring-cream-200 transition duration-300 hover:bg-cream-50 hover:text-coral-600 lg:grid"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous bestsellers"
          onClick={() => goTo(page - 1)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-coral-500 shadow-soft ring-1 ring-cream-200 transition duration-300 lg:hidden"
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
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  index === page ? "w-6 bg-coral-500" : "w-2 bg-cream-300"
                }`}
              />
            ))}
        </div>
        <button
          type="button"
          aria-label="Next bestsellers"
          onClick={() => goTo(page + 1)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-coral-500 shadow-soft ring-1 ring-cream-200 transition duration-300 lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
