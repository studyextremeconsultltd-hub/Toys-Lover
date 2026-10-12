import Image from "next/image";
import { ArrowRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { img } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-[#FFF5EB] to-[#FFE8F0]">
      <Container className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:py-14">
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 font-display text-xs font-black uppercase tracking-[0.18em] text-coral-500">
            Toy Bloom · UK toy shop
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            <span className="text-coral-500">Squishies.</span>
            <br />
            Our main squeeze.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600 sm:text-lg">
            Fruit, food and sensory jar squishies lead the shop — boxed with piece count and a fair UK
            price.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/#squishies" size="lg">
              Shop Squishies
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              Browse shop
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-600">
            <li className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-coral-500" />
              Squishies first
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Safe &amp; Non-Toxic
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-coral-500" />
              Parent Approved
            </li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-white/40 shadow-soft ring-1 ring-white/60">
            <Image
              src={img.homeHero}
              alt="Toddler playing with wooden blocks, train and stacking rings"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 42vw, 90vw"
              quality={70}
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
