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
import { formatPrice, getPiecesPerBox, toTitleCase } from "@/lib/utils";
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
  const pieces = getPiecesPerBox(product);
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
              {pieces ? <Badge tone="mint">Packet · {pieces} pcs</Badge> : null}
              {product.isNew ? <Badge>New</Badge> : null}
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl border border-cream-300 bg-cream-50 p-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Packet name</p>
                <p className="font-display text-xl font-extrabold text-ink-900">{toTitleCase(product.name)}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Price</p>
                <p className="font-display text-3xl font-extrabold text-ink-900">
                  {formatPrice(product.price)}
                  {product.compareAtPrice ? (
                    <span className="ml-3 text-lg text-ink-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  ) : null}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Complete items in box</p>
                <p className="font-display text-3xl font-extrabold text-teal-700">
                  {pieces ? `${pieces} pcs` : "1 pc"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Category</p>
                <p className="font-display text-xl font-extrabold text-ink-800">
                  {category?.shortName ?? product.categorySlug}
                </p>
              </div>
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
