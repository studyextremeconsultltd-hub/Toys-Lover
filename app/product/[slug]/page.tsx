import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { formatPrice, getBoxDeal, toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product" };
  const title = toTitleCase(product.name);
  const description =
    product.description?.slice(0, 155) ||
    `Buy ${title} from ${SITE_NAME}. Free UK shipping over £60.`;
  const image = product.images[0];
  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/product/${product.slug}/`,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);
  const deal = getBoxDeal(product);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((src) => `${SITE_URL}${src}`),
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: product.brand },
    category: category?.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}/`,
      priceCurrency: "GBP",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Section className="pt-10">
        <Container className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
              {category?.name} · {product.brand}
            </p>
            <h1 className="heading-glow mt-2 font-display text-4xl font-extrabold text-ink-900">
              {toTitleCase(product.name)}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} size="md" />
              {category ? (
                <Link href={`/shop/${category.slug}`}>
                  <Badge tone="sky">{category.shortName}</Badge>
                </Link>
              ) : null}
              <Badge tone="mint">{deal.pieces} pcs</Badge>
              <Badge tone="coral">{formatPrice(deal.boxPrice)}</Badge>
              {product.isNew ? <Badge>New</Badge> : null}
            </div>
            <div className="mt-5 rounded-2xl border border-teal-200 bg-teal-50/80 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Item in this box</p>
              <p className="font-display text-xl font-extrabold text-ink-900">{toTitleCase(product.name)}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Total pieces in box</p>
                  <p className="font-display text-3xl font-extrabold text-teal-700">{deal.pieces} pcs</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Competitive box price</p>
                  <p className="font-display text-3xl font-extrabold text-coral-500">
                    {formatPrice(deal.boxPrice)}
                  </p>
                  {deal.singlesCompare ? (
                    <p className="text-sm font-semibold text-ink-400 line-through">
                      {formatPrice(deal.singlesCompare)} if bought as singles
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
                    {deal.soldAsBox ? "Per piece in the box" : "Category"}
                  </p>
                  <p className="font-display text-2xl font-extrabold text-ink-800">
                    {deal.soldAsBox ? formatPrice(deal.perPiece) : category?.shortName ?? product.categorySlug}
                  </p>
                </div>
              </div>
              {deal.soldAsBox ? (
                <p className="mt-4 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-teal-800 ring-1 ring-teal-100">
                  Buy the full box — not singles. You get all {deal.pieces} pieces at a competitive box price
                  ({formatPrice(deal.perPiece)} each).
                </p>
              ) : null}
            </div>
            <ProductTabs product={product} />
            <div className="mt-6">
              <ProductActions product={product} />
            </div>
            <ul className="mt-8 space-y-2 text-sm text-ink-600">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 rounded-3xl bg-cream-200/70 p-5 text-sm sm:grid-cols-2">
              <div>
                <p className="font-display font-bold text-ink-900">Safety</p>
                <p className="mt-1 text-ink-600">{product.safety}</p>
              </div>
              <div>
                <p className="font-display font-bold text-ink-900">Materials</p>
                <p className="mt-1 text-ink-600">{product.materials}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <h2 className="heading-glow font-display text-3xl font-extrabold text-ink-900">
            Related Toys
          </h2>
          <div className="mt-8">
            <ProductGrid products={related} compact />
          </div>
        </Container>
      </Section>
    </>
  );
}
