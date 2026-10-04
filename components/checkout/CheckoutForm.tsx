"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice, toTitleCase } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const methodLabel: Record<string, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
  card: "Credit / debit card",
};

export function CheckoutForm({ method = "stripe" }: { method?: string }) {
  const { lines, subtotal, clearCart, itemCount } = useCart();
  const shipping = subtotal >= 60 || itemCount === 0 ? 0 : 4.5;
  const [done, setDone] = useState(false);
  const payName = methodLabel[method] ?? "Stripe";

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-card">
        <p className="heading-glow font-display text-3xl font-extrabold text-ink-900">
          {toTitleCase("Order placed (preview)")}
        </p>
        <p className="mt-3 text-ink-500">
          Nothing was charged. In production, {payName} would confirm the payment and we would email
          you from the {CONTACT.city} shop.
        </p>
        <Button href="/shop" className="mt-6">
          Keep browsing
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
        <p className="heading-glow font-display text-xl font-extrabold">
          {toTitleCase("Add something to the bag first.")}
        </p>
        <Button href="/shop" className="mt-5">
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_20rem]"
      onSubmit={(event) => {
        event.preventDefault();
        clearCart();
        setDone(true);
      }}
    >
      <div className="space-y-6 rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="heading-glow font-display text-xl font-extrabold">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Phone" name="phone" required defaultValue="" placeholder={CONTACT.phone} />
        </div>
        <h2 className="heading-glow font-display text-xl font-extrabold">Address</h2>
        <Input label="Street address" name="street" required />
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="City" name="city" required defaultValue={CONTACT.city} />
          <Input label="Region" name="region" required defaultValue={CONTACT.region} />
          <Input label="Country" name="country" required defaultValue={CONTACT.country} />
        </div>
        <Select label="Delivery" name="delivery" defaultValue="standard">
          <option value="standard">Standard (2–5 days)</option>
          <option value="pickup">Pickup in {CONTACT.city}</option>
        </Select>
        <h2 className="heading-glow font-display text-xl font-extrabold">
          Payment · {toTitleCase(payName)}
        </h2>
        <div className="flex items-start gap-2 rounded-2xl bg-mint-50 p-4 text-sm text-mint-800">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Card numbers are not collected on this form. In production, {payName} hosts the payment
            step so we never see full card data.
          </p>
        </div>
        <Textarea label="Gift note (optional)" name="note" placeholder="Happy birthday…" />
      </div>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-card">
        <h2 className="heading-glow font-display text-lg font-extrabold">
          Pay With {toTitleCase(payName)}
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {lines.map(({ product, quantity }) => (
            <li key={product.slug} className="flex justify-between gap-3">
              <span>
                {toTitleCase(product.name)} × {quantity}
              </span>
              <span>{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </p>
        <p className="mt-3 flex justify-between font-display text-lg font-extrabold">
          <span>Total</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </p>
        <Button type="submit" size="lg" variant="buy" className="mt-6 w-full">
          Place order (preview)
        </Button>
        <Button href="/pay" variant="outline" className="mt-3 w-full">
          Change payment method
        </Button>
      </aside>
    </form>
  );
}
