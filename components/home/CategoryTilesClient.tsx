"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { AisleCard } from "@/components/shop/AisleCard";
import { Button } from "@/components/ui/Button";

type AislePreview = {
  category: Category;
  count: number;
  productNames: string[];
};

const INITIAL = 12;

export function CategoryTilesClient({ aisles }: { aisles: AislePreview[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? aisles : aisles.slice(0, INITIAL);
  const remaining = aisles.length - INITIAL;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map(({ category, count, productNames }, index) => (
          <AisleCard
            key={category.slug}
            category={category}
            count={count}
            productNames={productNames}
            priority={index < 2}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {!expanded && remaining > 0 ? (
          <Button type="button" size="lg" variant="outline" onClick={() => setExpanded(true)}>
            Show {remaining} more aisles
          </Button>
        ) : null}
        <Link
          href="/shop"
          className="font-display text-sm font-bold text-coral-600 underline-offset-4 hover:underline"
        >
          Open full shop
        </Link>
      </div>
    </>
  );
}
