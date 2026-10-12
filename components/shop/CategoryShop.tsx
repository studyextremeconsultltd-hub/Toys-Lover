"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { PRICE_RANGES, SORT_OPTIONS } from "@/lib/constants";
import { Select } from "@/components/ui/Input";
import { ProductGrid } from "@/components/product/ProductGrid";
import { toTitleCase } from "@/lib/utils";

export function CategoryShop({
  category,
  products,
  brands,
  themes,
}: {
  category: Category;
  products: Product[];
  brands: string[];
  themes: string[];
}) {
  const [price, setPrice] = useState("all");
  const [brand, setBrand] = useState("all");
  const [theme, setTheme] = useState("all");
  const [sort, setSort] = useState("popularity");

  const filtered = useMemo(() => {
    const next = products.filter((product) => {
      if (brand !== "all" && product.brand !== brand) return false;
      if (theme !== "all" && product.theme !== theme) return false;
      if (price !== "all") {
        const range = PRICE_RANGES.find((item) => item.id === price);
        if (!range) return false;
        if (product.price < range.min || product.price >= range.max) return false;
      }
      return true;
    });

    next.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return Number(b.isNew) - Number(a.isNew);
      return b.reviewCount - a.reviewCount;
    });

    return next;
  }, [products, brand, theme, price, sort]);

  const mentioned = products.slice(0, 8);

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_1fr]">
      <aside className="grid grid-cols-2 gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft lg:sticky lg:top-20 lg:grid-cols-1 lg:h-fit">
        <h2 className="col-span-2 font-display text-base font-extrabold text-ink-900 lg:col-span-1">
          Filters
        </h2>
        <Select label="Price range" value={price} onChange={(event) => setPrice(event.target.value)}>
          <option value="all">Any price</option>
          {PRICE_RANGES.map((range) => (
            <option key={range.id} value={range.id}>
              {range.label}
            </option>
          ))}
        </Select>
        <Select label="Brand" value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="all">All brands</option>
          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select label="Theme" value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="all">All themes</option>
          {themes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        {mentioned.length ? (
          <div className="col-span-2 mt-2 border-t border-ink-100 pt-3 lg:col-span-1">
            <p className="mb-2 font-display text-xs font-black uppercase tracking-wide text-ink-400">
              In this category
            </p>
            <ul className="space-y-1.5">
              {mentioned.map((product) => (
                <li key={product.slug} className="truncate text-xs font-semibold text-ink-600">
                  · {toTitleCase(product.name)}
                </li>
              ))}
              {products.length > mentioned.length ? (
                <li className="text-[11px] font-bold uppercase tracking-wide text-coral-600">
                  +{products.length - mentioned.length} more
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? "product" : "products"} in {category.shortName}
          </p>
          <div className="sm:w-64">
            <Select label="Sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <ProductGrid products={filtered.length ? filtered : products} compact />
        {!filtered.length && products.length ? (
          <p className="mt-4 text-center text-sm text-ink-500">
            Nothing matched those filters — showing the full aisle instead.
          </p>
        ) : null}
      </div>
    </div>
  );
}
