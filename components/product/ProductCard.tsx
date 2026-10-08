import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { formatPrice, getPiecesPerBox, toTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { AddButton, WishButton } from "@/components/product/ProductCardActions";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const pieces = getPiecesPerBox(product);

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
          {product.compareAtPrice ? <Badge className="bg-coral-500 text-white">Sale</Badge> : null}
          {product.isNew ? <Badge>New</Badge> : null}
        </div>
        {pieces ? (
          <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
            Packet · {pieces} pcs
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
        <div className="mt-auto rounded-xl border border-cream-200 bg-cream-50 p-2.5">
          <p className="truncate text-[11px] font-semibold text-ink-600">
            Packet: {toTitleCase(product.name)}
          </p>
          <div className="mt-1.5 flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Price</p>
              <p className="font-display text-lg font-bold text-coral-500">
                {formatPrice(product.price)}
                {product.compareAtPrice ? (
                  <span className="ml-1.5 text-sm font-semibold text-ink-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                ) : null}
              </p>
            </div>
            {pieces ? (
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">In box</p>
                <p className="font-display text-sm font-black text-ink-800">{pieces} pcs</p>
              </div>
            ) : null}
          </div>
        </div>
        <AddButton slug={product.slug} />
      </div>
    </article>
  );
}
