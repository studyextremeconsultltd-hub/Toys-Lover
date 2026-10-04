"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MapPin, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { FREE_SHIPPING_GBP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/shop", label: "Shop All" },
  { href: "/age/3-5", label: "By Age" },
  { href: "/shop", label: "By Category" },
  { href: "/shop/educational-stem", label: "STEM Toys" },
  { href: "/shop/board-games", label: "Books" },
  { href: "/blog/gift-guide-ages-three-to-five", label: "Gift Guide" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { items: wished } = useWishlist();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-coral-500 px-4 py-1.5 text-[11px] font-semibold text-white sm:text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <p>Free Shipping on orders over £{FREE_SHIPPING_GBP}!</p>
          <p className="hidden items-center gap-3 sm:flex">
            <span>Easy Returns</span>
            <span>•</span>
            <span>Secure Payments</span>
            <span>•</span>
            <span>Loved by Parents</span>
          </p>
          <p className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            Shop to: United Kingdom
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Logo compact />

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/shop" && pathname.startsWith(link.href));
            return (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                prefetch={false}
                className={cn(
                  "rounded-full px-3 py-2 font-display text-sm font-semibold text-ink-700 transition hover:text-coral-500",
                  active && "text-coral-500",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 text-ink-700">
          <Link href="/shop" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100" aria-label="Search toys">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/contact" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-cream-100 sm:grid" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wished.length > 0 ? (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-coral-500 px-1 text-[10px] font-bold text-white">
                {wished.length}
              </span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-coral-500 px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink-900/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full z-50 border-b border-cream-200 bg-white px-4 py-4 shadow-card"
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}-m`}
                  href={link.href}
                  prefetch={false}
                  className="rounded-2xl px-4 py-3 font-display text-base font-semibold text-ink-800 hover:bg-cream-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
