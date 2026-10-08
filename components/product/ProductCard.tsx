import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { formatPrice, getBoxDeal, toTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { AddButton, WishButton } from "@/components/product/ProductCardActions";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const deal = getBoxDeal(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-soft ring-1 ring-cream-200">
      <div className="relative overflow-hidden bg-white">
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
            quality={95}
            className="object-contain object-center bg-white"
          />
        </Link>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {deal.soldAsBox ? <Badge className="bg-teal-600 text-white">Best: buy box</Badge> : null}
          {product.isNew ? <Badge>New</Badge> : null}
        </div>
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
          {deal.pieces} pcs · {formatPrice(deal.boxPrice)}
        </span>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-3 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
          {category?.shortName ?? product.categorySlug}
        </p>
        <h3 className="font-display text-sm font-bold leading-snug text-ink-800 sm:text-base">
          <Link href={`/product/${product.slug}`} className="hover:text-coral-500">
            {toTitleCase(product.name)}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="mt-auto rounded-xl border border-teal-100 bg-teal-50/70 p-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">Item in this box</p>
          <p className="truncate font-display text-xs font-bold text-ink-800">{toTitleCase(product.name)}</p>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-ink-500">Single item</span>
              <span className="font-display text-sm font-bold text-ink-700">
                {formatPrice(deal.singleItemPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-ink-500">Total pcs in box</span>
              <span className="font-display text-sm font-black text-ink-900">{deal.pieces} pcs</span>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-teal-100 pt-1.5">
              <span className="text-[11px] font-bold text-teal-800">Box price</span>
              <span className="font-display text-lg font-bold text-coral-500">{formatPrice(deal.boxPrice)}</span>
            </div>
          </div>
          {deal.soldAsBox ? (
            <p className="mt-2 text-[11px] font-semibold leading-snug text-teal-800">
              Single ({formatPrice(deal.singleItemPrice)}) is lower than the box — but the box wins:{" "}
              {deal.pieces} pcs for {formatPrice(deal.boxPrice)} ({formatPrice(deal.perPiece)} each). Save{" "}
              {formatPrice(deal.savings)} vs {deal.pieces} singles.
            </p>
          ) : (
            <p className="mt-2 text-[11px] font-semibold text-teal-800">
              Price {formatPrice(deal.boxPrice)} · {deal.pieces} pc
            </p>
          )}
        </div>
        <AddButton slug={product.slug} label={deal.soldAsBox ? "Add box — best value" : "Add"} />
      </div>
    </article>
  );
}
