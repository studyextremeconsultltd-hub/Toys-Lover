import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { img } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { PayMethods } from "@/components/pay/PayMethods";

export const metadata: Metadata = {
  title: "Pay",
  robots: { index: false, follow: false },
};

export default function PayPage() {
  return (
    <>
      <PageHero
        image={img.pageSale}
        eyebrow="Till"
        title="Pick a rail: Stripe, PayPal, or card"
        description="Only the method is chosen here. Card digits are never typed on this page."
      />
      <Section>
        <Container>
          <PayMethods />
          <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 text-sm text-ink-500">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            Production shops connect Stripe and PayPal with secret keys stored only on the server —
            never in the browser, never copied from another website.
          </p>
        </Container>
      </Section>
    </>
  );
}
