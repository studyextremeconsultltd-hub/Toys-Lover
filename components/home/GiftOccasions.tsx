import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const occasions = [
  { href: "/shop/party-spotlight", title: "Birthday Gifts", image: img.giftBirthday },
  { href: "/shop/christmas-glow", title: "Holiday Gifts", image: img.giftHoliday },
  { href: "/shop/educational-stem", title: "Back to School", image: img.giftSchool },
  { href: "/shop/arts-crafts", title: "Rainy Day Fun", image: img.giftRainy },
  { href: "/shop/arts-crafts", title: "Creative Play", image: img.giftArt },
  { href: "/shop/games-gadgets", title: "Travel Toys", image: img.giftTravel },
];

export function GiftOccasions() {
  return (
    <section className="bg-cream-50 py-12">
      <Container>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-800 sm:text-3xl">Find the Perfect Gift</h2>
            <p className="mt-1 text-sm text-ink-500">Curated picks for every occasion</p>
          </div>
          <Button href="/blog/gift-guide-ages-three-to-five" variant="outline" size="sm">
            Explore Gift Guide
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {occasions.map((item) => (
            <Link key={item.title} href={item.href} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="180px"
                  className="object-cover transition duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-2 font-display text-sm font-bold text-ink-800">{item.title}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
