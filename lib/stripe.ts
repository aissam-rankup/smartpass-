import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: { name: "SmartPass", version: "0.1.0" },
  });
  return _stripe;
}

// Proxy so existing `stripe.subscriptions.retrieve(...)` call sites keep working.
export const stripe = new Proxy({} as Stripe, {
  get(_t, prop: keyof Stripe) {
    return getStripe()[prop];
  },
});

export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY_ID || "",
  annual: process.env.STRIPE_PRICE_ANNUAL_ID || "",
} as const;

export type StripePlan = keyof typeof STRIPE_PRICES;
