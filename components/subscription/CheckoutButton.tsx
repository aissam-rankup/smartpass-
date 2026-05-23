"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function CheckoutButton({
  plan,
  children,
  variant = "primary",
  size = "lg",
}: {
  plan: "monthly" | "annual";
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        window.location.href = `/login?callbackUrl=${encodeURIComponent("/smart-pass?plan=" + plan)}`;
        return;
      }
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "Erreur de paiement");
      window.location.href = data.url;
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Button onClick={go} disabled={loading} variant={variant} size={size} className="w-full">
        {loading ? "Redirection..." : children}
      </Button>
      {error && <p className="mt-2 text-center text-xs text-error">{error}</p>}
    </div>
  );
}
