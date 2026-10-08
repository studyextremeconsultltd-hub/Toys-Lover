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
            quality={92}
            className="object-contain object-center bg-white"
          />
        </Link>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {deal.soldAsBox ? <Badge className="bg-teal-600 text-white">Full box</Badge> : null}
          {product.compareAtPrice ? <Badge className="bg-coral-500 text-white">Sale</Badge> : null}
          {product.isNew ? <Badge>New</Badge> : null}
        </div>
        {deal.soldAsBox ? (
          <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
            Box · {deal.pieces} pcs
          </span>
        ) : null}
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
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Total pieces</p>
              <p className="font-display text-sm font-black text-ink-900">{deal.pieces} pcs</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Box price</p>
              <p className="font-display text-lg font-bold text-coral-500">
                {formatPrice(deal.boxPrice)}
              </p>
              {deal.singlesCompare ? (
                <p className="text-[10px] font-semibold text-ink-400 line-through">
                  {formatPrice(deal.singlesCompare)} singles
                </p>
              ) : null}
            </div>
          </div>
          {deal.soldAsBox ? (
            <p className="mt-2 text-[11px] font-semibold leading-snug text-teal-800">
              Buy the full box — only {formatPrice(deal.perPiece)} each. Better value than singles.
            </p>
          ) : null}
        </div>
        <AddButton slug={product.slug} label={deal.soldAsBox ? "Add box" : "Add"} />
      </div>
    </article>
  );
}
