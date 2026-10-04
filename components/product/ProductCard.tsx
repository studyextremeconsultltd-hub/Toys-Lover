import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice, toTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { AddButton, WishButton } from "@/components/product/ProductCardActions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[1.4rem] bg-white shadow-soft">
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
            quality={70}
            className="object-contain object-center bg-white p-0.5"
          />
        </Link>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.compareAtPrice ? <Badge className="bg-coral-500 text-white">Sale</Badge> : null}
          {product.isNew ? <Badge>New</Badge> : null}
        </div>
        <WishButton slug={product.slug} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-1 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">{product.ageRange}</p>
        <h3 className="font-display text-sm font-bold leading-snug text-ink-800 sm:text-base">
          <Link href={`/product/${product.slug}`} className="hover:text-coral-500">
            {toTitleCase(product.name)}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <p className="mt-auto font-display text-lg font-bold text-coral-500">
          {formatPrice(product.price)}
          {product.compareAtPrice ? (
            <span className="ml-1.5 text-sm font-semibold text-ink-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
        <AddButton slug={product.slug} />
      </div>
    </article>
  );
}
