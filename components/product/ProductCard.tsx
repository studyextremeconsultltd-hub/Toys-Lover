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
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[5/4] min-h-[11rem] overflow-hidden bg-white sm:min-h-[14rem] lg:min-h-[16rem]"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, 50vw"
            quality={100}
            className="product-shot object-contain object-center bg-white"
          />
        </Link>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
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
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-cream-200 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Box price</span>
          <span className="font-display text-xl font-bold text-coral-500">{formatPrice(deal.boxPrice)}</span>
        </div>
        <AddButton slug={product.slug} label={deal.soldAsBox ? "Add box" : "Add"} />
      </div>
    </article>
  );
}
