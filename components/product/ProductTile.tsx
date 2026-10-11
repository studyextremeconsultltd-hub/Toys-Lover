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
          className="relative block aspect-[4/3] min-h-[16rem] overflow-hidden bg-ink-900 sm:min-h-[20rem]"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            quality={100}
            className="!object-cover !object-center"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Link>
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-ink-900/90 px-2.5 py-1.5 font-display text-xs font-black uppercase tracking-wide text-white">
          {deal.pieces} pcs · {formatPrice(deal.boxPrice)}
        </span>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-4">
        <h3 className="font-display text-base font-bold leading-snug text-ink-800">
          <Link href={`/product/${product.slug}`} className="hover:text-coral-500">
            {toTitleCase(product.name)}
          </Link>
        </h3>
        <div className="mt-1">
          <Rating value={product.rating} />
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-cream-200 pt-2">
          <span className="text-[11px] font-semibold text-ink-500">Box price</span>
          <span className="font-display text-xl font-bold text-coral-500">{formatPrice(deal.boxPrice)}</span>
        </div>
      </div>
    </article>
  );
}
