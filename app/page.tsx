import { getBestSellers } from "@/lib/data/products";
import { Hero } from "@/components/home/Hero";
import { SquishyLane } from "@/components/home/SquishyLane";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { LearningBenefits } from "@/components/home/LearningBenefits";
import { SaleBanner } from "@/components/home/SaleBanner";
import { ParentLove } from "@/components/home/ParentLove";
import { GiftOccasions } from "@/components/home/GiftOccasions";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Newsletter } from "@/components/home/Newsletter";
import { BestSellers } from "@/components/home/BestSellers";
import { PayNowBanner } from "@/components/home/PayNowBanner";
import { GlowHeading } from "@/components/home/GlowHeading";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  const bestsellers = getBestSellers();

  return (
    <>
      <Hero />
      <SquishyLane />
      <CategoryTiles title="Shop by Category" eyebrow="Click the header for every aisle" />

      <section id="trending" className="bg-cream-50 py-14">
        <Container>
          <GlowHeading eyebrow="Parents pick these first" title="Best Sellers" />
          <div className="mt-8">
            <BestSellers products={bestsellers} />
          </div>
        </Container>
      </section>

      <PayNowBanner />
      <LearningBenefits />
      <SaleBanner />
      <ParentLove />
      <GiftOccasions />
      <TrustBadges />
      <Newsletter />
    </>
  );
}
