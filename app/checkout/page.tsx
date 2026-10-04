import type { Metadata } from "next";
import { img } from "@/lib/media";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { method?: string };
}) {
  const method = searchParams.method === "paypal" || searchParams.method === "card" ? searchParams.method : "stripe";

  return (
    <>
      <PageHero
        image={img.pageShop}
        eyebrow="Checkout"
        title="Almost there"
        description="Confirm delivery details. Payment stays with the method you chose — we do not store card numbers."
      />
      <Section>
        <Container>
          <CheckoutForm method={method} />
        </Container>
      </Section>
    </>
  );
}
