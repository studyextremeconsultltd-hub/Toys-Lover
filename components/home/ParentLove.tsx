import Image from "next/image";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data/reviews";
import { img } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { GlowHeading } from "@/components/home/GlowHeading";

const portraits = [img.teamAmina, img.teamHassan, img.teamSana];

export function ParentLove() {
  const parents = REVIEWS.filter((review) => !review.age.includes("Kids")).slice(0, 3);

  return (
    <section className="bg-white py-12">
      <Container>
        <GlowHeading title="Loved by Parents, Trusted by Kids" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {parents.map((review, index) => (
            <article key={review.name} className="rounded-[1.6rem] bg-cream-50 p-6 shadow-soft">
              <div className="flex gap-0.5 text-sun-400" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-sun-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">“{review.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white">
                  <Image src={portraits[index]} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-ink-800">{review.name}</p>
                  <p className="text-xs text-ink-400">{review.place}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
