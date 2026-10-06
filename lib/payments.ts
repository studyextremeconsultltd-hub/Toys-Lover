export const DEPOSIT_PRESETS_GBP = [10, 25, 50, 100] as const;

export const DEFAULT_DEPOSIT_GBP = 25;

/** Public labels shown on Pay Now UI (not secrets). */
export const PAYMENT_ACCOUNTS = {
  stripe: {
    id: "stripe" as const,
    name: "Stripe",
    label: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT_LABEL || "Toy Bloom · Stripe",
    blurb: "Card checkout on Stripe’s official secure page.",
  },
  paypal: {
    id: "paypal" as const,
    name: "PayPal",
    label: process.env.NEXT_PUBLIC_PAYPAL_ACCOUNT_LABEL || "Toy Bloom · PayPal",
    blurb: "PayPal balance or card on PayPal’s official page.",
  },
};

export type PayMethodId = keyof typeof PAYMENT_ACCOUNTS;
