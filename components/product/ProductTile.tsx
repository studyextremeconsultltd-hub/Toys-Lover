import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice, getBoxDeal, toTitleCase } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { WishButton } from "@/components/product/ProductCardActions";

export function ProductTile({ product }: { product: Product }) {
  const deal = getBoxDeal(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-cream-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-white"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 16vw, 50vw"
            quality={95}
            className="object-contain object-center bg-white"
          />
        </Link>
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
          {deal.pieces} pcs · {formatPrice(deal.boxPrice)}
        </span>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <h3 className="font-display text-sm font-bold leading-snug text-ink-800">
          <Link href={`/product/${product.slug}`} className="hover:text-coral-500">
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
          {deal.soldAsBox ? (
            <p className="font-semibold text-teal-700">Buy the box — save {formatPrice(deal.savings)}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
