"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Resp = { token: string; id: string; generatedAt: string };

export function QrDisplay({ offerId }: { offerId: string }) {
  const [qr, setQr] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setQr(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerId]);

  if (loading) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-white">
        <span className="text-sm text-muted">Génération en cours...</span>
      </div>
    );
  }

  if (error || !qr) {
    return (
      <div className="rounded-lg border border-error/30 bg-coral-light p-6 text-center">
        <p className="text-sm text-error">{error ?? "Erreur inattendue"}</p>
        <Button onClick={generate} variant="secondary" size="sm" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/scan/${qr.token}`;

  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Badge variant="teal">✓ Valide — Usage unique</Badge>
        <span className="text-[10px] uppercase tracking-wider text-muted">
          {new Date(qr.generatedAt).toLocaleString("fr-FR")}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-center rounded-lg bg-sand p-6">
        <QRCodeSVG
          value={url}
          size={240}
          bgColor="transparent"
          fgColor="#1a1a18"
          level="M"
          includeMargin={false}
        />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Présentez ce QR au partenaire. Il le scannera pour valider votre réduction.
        Code à usage unique — vous pourrez en générer un nouveau à tout moment.
      </p>

      <div className="mt-6">
        <Button onClick={generate} variant="secondary" className="w-full">
          Regénérer un nouveau QR
        </Button>
      </div>
    </div>
  );
}
