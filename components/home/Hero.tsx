import Image from "next/image";
import { ArrowRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { img } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BirdDoodle, LeafDoodle, RingsDoodle, TrainDoodle } from "@/components/brand/Doodles";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <LeafDoodle className="pointer-events-none absolute -left-4 bottom-0 hidden h-48 w-36 lg:block" />
      <LeafDoodle className="pointer-events-none absolute -right-8 bottom-4 hidden h-40 w-32 scale-x-[-1] lg:block" />
      <BirdDoodle className="pointer-events-none absolute left-[46%] top-6 hidden h-14 w-20 lg:block" />
      <Container className="grid items-center gap-6 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-10">
        <div className="relative z-10">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            <span className="text-coral-500">Squishies.</span>
            <br />
            <span className="text-teal-600">Our main squeeze.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600 sm:text-lg">
            Fruit, food and sensory jar squishies lead the shop — each boxed with piece count and a fair UK price.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/#squishies" size="lg">
              Shop Squishies
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/pay" variant="sun" size="lg" className="shadow-[0_0_20px_rgba(250,204,21,0.45)]">
              Pay Now
            </Button>
            <Button href="/shop#all-categories" variant="outline" size="lg">
              All Categories
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-600">
            <li className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-coral-500" />
              Squishies first
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Safe & Non-Toxic
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-coral-500" />
              Parent Approved
            </li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <RingsDoodle className="pointer-events-none absolute -left-8 bottom-8 hidden h-20 w-20 lg:block" />
          <TrainDoodle className="pointer-events-none absolute -bottom-2 left-10 hidden h-14 w-28 lg:block" />
          <div className="relative aspect-[5/4]">
            <Image
              src={img.homeHero}
              alt="Toddler playing with wooden blocks, train and stacking rings"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 46vw, 100vw"
              quality={62}
              className="object-contain object-bottom"
            />
          </div>
          <div className="absolute right-0 top-2 grid h-28 w-28 place-items-center rounded-full bg-teal-600 p-4 text-center text-white shadow-lift sm:right-2 sm:h-32 sm:w-32">
            <p className="font-display text-[11px] font-bold leading-snug sm:text-sm">
              Learning through
              <br />
              Every Adventure
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
