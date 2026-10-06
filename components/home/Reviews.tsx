"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { REVIEWS } from "@/lib/data/reviews";
import { toTitleCase } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlowHeading } from "@/components/home/GlowHeading";
import { ToyPhoto } from "@/components/ui/ToyPhoto";

export function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 360), behavior: "smooth" });
  };

  return (
    <Section className="bg-gradient-to-r from-coral-50 via-orange-50 to-amber-50 py-8">
      <Container>
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <GlowHeading eyebrow="Kids & families" title="Appreciations & play notes" tone="orange" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#7A4A2B] text-white shadow-soft hover:bg-[#5c351f]"
              aria-label="Previous comments"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#F25C38] text-white shadow-soft hover:bg-coral-600"
              aria-label="Next comments"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="w-[min(88vw,20.5rem)] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-white shadow-card"
            >
              <ToyPhoto
                src={review.image}
                alt={`${review.name} — ${review.age}`}
                sizes="330px"
                fit={review.image.includes("/products/") ? "contain" : "cover"}
                className="aspect-[16/10]"
              />
              <div className={`flex min-h-[14.5rem] flex-col p-5 text-white ${review.chart}`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-white/20 px-3 py-1 font-display text-[11px] font-black uppercase tracking-wide">
                    {review.age}
                  </span>
                  <Quote className="h-6 w-6 text-white/80" aria-hidden />
                </div>
                <div className="mt-3 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <h3 className="heading-glow-light mt-3 font-display text-lg font-extrabold leading-snug">
                  {toTitleCase(review.title)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/95">“{review.quote}”</p>
                <p className="mt-3 font-display text-sm font-extrabold">
                  {review.name}
                  <span className="ml-2 text-xs font-bold uppercase tracking-wide text-white/80">
                    {review.place}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
