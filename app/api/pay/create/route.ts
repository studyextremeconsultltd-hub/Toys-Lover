import { NextResponse } from "next/server";
import { CONTACT, SITE_NAME } from "@/lib/constants";

export const runtime = "nodejs";

type Body = {
  method?: string;
  name?: string;
  email?: string;
  phone?: string;
  amount?: number | string;
  note?: string;
};

function siteUrl(req: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  return host ? `${proto}://${host}` : "http://127.0.0.1:3000";
}

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function parseAmount(raw: unknown) {
  const n = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 1 || n > 5000) return null;
  return Math.round(n * 100) / 100;
}

async function createStripeCheckout(opts: {
  amount: number;
  email: string;
  name: string;
  phone: string;
  note: string;
  origin: string;
}) {
  const secret = clean(process.env.STRIPE_SECRET_KEY);
  if (secret.startsWith("sk_")) {
    const unitAmount = Math.round(opts.amount * 100);
    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("success_url", `${opts.origin}/pay?status=success&provider=stripe`);
    params.set("cancel_url", `${opts.origin}/pay?status=cancel&provider=stripe`);
    params.set("customer_email", opts.email);
    params.set("billing_address_collection", "required");
    params.set("phone_number_collection[enabled]", "true");
    params.set("submit_type", "pay");
    params.set("payment_intent_data[description]", `${SITE_NAME} deposit — ${opts.name}`);
    params.set("metadata[customer_name]", opts.name);
    params.set("metadata[customer_phone]", opts.phone);
    params.set("metadata[note]", opts.note.slice(0, 450));
    params.set("metadata[kind]", "deposit");
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "gbp");
    params.set("line_items[0][price_data][unit_amount]", String(unitAmount));
    params.set("line_items[0][price_data][product_data][name]", `${SITE_NAME} order deposit`);
    params.set(
      "line_items[0][price_data][product_data][description]",
      opts.note || `Deposit towards your ${SITE_NAME} order`,
    );

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const data = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !data.url) {
      throw new Error(data.error?.message || "Stripe checkout could not be started.");
    }
    return data.url;
  }

  const paymentLink = clean(process.env.STRIPE_PAYMENT_LINK || process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK);
  if (paymentLink.startsWith("https://")) {
    const url = new URL(paymentLink);
    url.searchParams.set("prefilled_email", opts.email);
    url.searchParams.set("client_reference_id", `${opts.name}|${opts.phone}|${opts.amount}`);
    return url.toString();
  }

  throw new Error(
    "Stripe is not configured yet. Add STRIPE_SECRET_KEY or STRIPE_PAYMENT_LINK in the server environment.",
  );
}

async function createPayPalCheckout(opts: {
  amount: number;
  email: string;
  name: string;
  phone: string;
  note: string;
  origin: string;
}) {
  const clientId = clean(process.env.PAYPAL_CLIENT_ID);
  const clientSecret = clean(process.env.PAYPAL_CLIENT_SECRET);
  const mode = clean(process.env.PAYPAL_MODE || "live").toLowerCase() === "sandbox" ? "sandbox" : "live";
  const apiBase = mode === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

  if (clientId && clientSecret) {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch(`${apiBase}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const tokenData = (await tokenRes.json()) as { access_token?: string; error_description?: string };
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || "PayPal authentication failed.");
    }

    const orderRes = await fetch(`${apiBase}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "GBP",
              value: opts.amount.toFixed(2),
            },
            description: `${SITE_NAME} deposit — ${opts.name}`,
            custom_id: `${opts.email}|${opts.phone}`.slice(0, 127),
          },
        ],
        payer: {
          email_address: opts.email,
          name: { given_name: opts.name.split(" ")[0] || opts.name, surname: opts.name.split(" ").slice(1).join(" ") || "." },
        },
        application_context: {
          brand_name: SITE_NAME,
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
          return_url: `${opts.origin}/pay?status=success&provider=paypal`,
          cancel_url: `${opts.origin}/pay?status=cancel&provider=paypal`,
        },
      }),
    });
    const order = (await orderRes.json()) as {
      links?: { rel: string; href: string }[];
      message?: string;
      details?: { description?: string }[];
    };
    const approve = order.links?.find((l) => l.rel === "approve")?.href;
    if (!orderRes.ok || !approve) {
      throw new Error(order.message || order.details?.[0]?.description || "PayPal checkout could not be started.");
    }
    return approve;
  }

  const meLink = clean(process.env.PAYPAL_ME_LINK || process.env.NEXT_PUBLIC_PAYPAL_ME_LINK);
  if (meLink.startsWith("https://")) {
    const base = meLink.replace(/\/$/, "");
    return `${base}/${opts.amount.toFixed(2)}`;
  }

  throw new Error(
    "PayPal is not configured yet. Add PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET or PAYPAL_ME_LINK.",
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const method = clean(body.method).toLowerCase();
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const note = clean(body.note);
    const amount = parseAmount(body.amount);

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, message: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ ok: false, message: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!amount) {
      return NextResponse.json({ ok: false, message: "Enter a deposit between £1 and £5,000." }, { status: 400 });
    }
    if (method !== "stripe" && method !== "paypal") {
      return NextResponse.json({ ok: false, message: "Choose Stripe or PayPal." }, { status: 400 });
    }

    const origin = siteUrl(req);
    const payload = { amount, email, name, phone, note, origin };

    const url =
      method === "stripe" ? await createStripeCheckout(payload) : await createPayPalCheckout(payload);

    return NextResponse.json({
      ok: true,
      url,
      method,
      amount,
      shop: CONTACT.email,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment could not be started.";
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}
