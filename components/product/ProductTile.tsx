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
        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-cream-200 pt-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Total pcs</p>
            <p className="font-display text-sm font-black text-ink-900">{deal.pieces} pcs</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Box price</p>
            <p className="font-display text-base font-bold text-coral-500">{formatPrice(deal.boxPrice)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
