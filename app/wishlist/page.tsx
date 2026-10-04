"use client";

import { useWishlist } from "@/lib/context/WishlistContext";
import { img } from "@/lib/media";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <>
      <PageHero
        image={img.plush}
        eyebrow="Saved for later"
        title="The maybe pile"
        description="Hearts stay in this browser until you are ready to buy."
      />
      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-card">
              <p className="heading-glow font-display text-2xl font-extrabold text-ink-900">
                Nothing Saved Yet
              </p>
              <p className="mt-2 text-ink-500">Tap a heart on any toy to keep it here.</p>
              <Button href="/shop" className="mt-5">
                Explore Categories
              </Button>
            </div>
          ) : (
            <ProductGrid products={items} compact />
          )}
        </Container>
      </Section>
    </>
  );
}
