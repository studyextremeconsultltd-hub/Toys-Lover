import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { toTitleCase } from "@/lib/utils";

export function PageHero({
  image,
  eyebrow,
  title,
  description,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-cream-100">
      <Container className="grid items-center gap-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-12">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            {toTitleCase(eyebrow)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-800 sm:text-5xl">
            <span className="text-coral-500">{toTitleCase(title)}</span>
          </h1>
          {description ? <p className="mt-3 max-w-xl text-base text-ink-600">{description}</p> : null}
        </div>
        <div className="relative hidden overflow-hidden rounded-[1.8rem] bg-white shadow-soft ring-1 ring-cream-200 lg:block">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="40vw"
              quality={70}
              className="object-contain object-center bg-white p-0.5"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
