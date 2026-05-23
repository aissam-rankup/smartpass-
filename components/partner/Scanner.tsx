"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Camera, Keyboard } from "lucide-react";

type ScanResult =
  | {
      status: "OK";
      touristName: string;
      offer: { name: string; normalPrice: number; reducedPrice: number };
      partner: { name: string };
      validatedAt: string;
    }
  | { status: "USED"; usedAt: string; offer: { name: string } }
  | { status: "INVALID" | "EXPIRED" | "REVOKED"; error?: string };

export function Scanner() {
  const [mode, setMode] = useState<"camera" | "manual">("camera");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [manualToken, setManualToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<Html5Qrcode | null>(null);

  async function validate(token: string) {
    setResult(null);
    setError(null);
    try {
      // Token may arrive as a full URL containing /scan/[token]
      const clean = token.includes("/scan/") ? token.split("/scan/").pop()!.split(/[?#]/)[0] : token;
      const res = await fetch("/api/qr/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: clean }),
      });
      const data = (await res.json()) as ScanResult & { error?: string };
      setResult(data);
      if (!res.ok && data.error) setError(data.error);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function startCamera() {
    if (!containerRef.current) return;
    setResult(null);
    setError(null);
    setScanning(true);
    try {
      const qr = new Html5Qrcode(containerRef.current.id);
      qrRef.current = qr;
      await qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decoded) => {
          await qr.stop();
          setScanning(false);
          validate(decoded);
        },
        () => {}
      );
    } catch (e) {
      setScanning(false);
      setError("Impossible d'accéder à la caméra. " + (e as Error).message);
    }
  }

  async function stopCamera() {
    try {
      await qrRef.current?.stop();
    } catch {}
    setScanning(false);
  }

  useEffect(() => {
    return () => {
      qrRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "camera" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setMode("camera");
            setResult(null);
          }}
        >
          <Camera className="h-4 w-4" /> Caméra
        </Button>
        <Button
          variant={mode === "manual" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setMode("manual");
            stopCamera();
            setResult(null);
          }}
        >
          <Keyboard className="h-4 w-4" /> Manuel
        </Button>
      </div>

      {mode === "camera" ? (
        <div className="overflow-hidden rounded-lg border border-border bg-charcoal">
          <div id="qr-scanner-region" ref={containerRef} className="aspect-square w-full" />
          <div className="flex items-center justify-between gap-3 border-t border-border bg-white p-4">
            {!scanning ? (
              <Button onClick={startCamera} className="flex-1">
                Démarrer le scan
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="secondary" className="flex-1">
                Arrêter
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualToken.trim()) validate(manualToken.trim());
          }}
          className="rounded-lg border border-border bg-white p-4"
        >
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Token ou URL du QR
          </label>
          <input
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="cln1...  ou  https://smartpass.ma/scan/..."
            className="mt-2 h-11 w-full rounded-md border border-border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          />
          <Button type="submit" className="mt-4 w-full">
            Valider
          </Button>
        </form>
      )}

      {error && (
        <div className="rounded-lg border border-error/30 bg-coral-light p-4 text-sm text-error">
          {error}
        </div>
      )}

      {result && <ResultCard result={result} onReset={() => setResult(null)} />}
    </div>
  );
}

function ResultCard({ result, onReset }: { result: ScanResult; onReset: () => void }) {
  if (result.status === "OK") {
    const saving = result.offer.normalPrice - result.offer.reducedPrice;
    return (
      <div className="rounded-lg border-2 border-teal bg-teal-light p-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-teal" />
        <h3 className="mt-4 font-display text-2xl font-bold text-teal">Smart Pass valide !</h3>
        <p className="mt-2 text-sm text-charcoal">
          Touriste : <span className="font-semibold">{result.touristName}</span>
        </p>
        <p className="mt-1 text-sm text-charcoal">Offre : {result.offer.name}</p>
        <div className="mt-4 inline-block rounded-md bg-white px-6 py-4 shadow-sm">
          <p className="text-xs text-muted">Tarif à appliquer</p>
          <p className="font-display text-3xl font-bold text-teal">
            {formatPrice(result.offer.reducedPrice)}
          </p>
          <p className="text-xs text-muted line-through">{formatPrice(result.offer.normalPrice)}</p>
          <p className="mt-1 text-xs text-teal">
            Le touriste économise {formatPrice(saving)}
          </p>
        </div>
        <p className="mt-4 text-xs text-muted">
          QR invalidé — il ne peut plus être réutilisé.
        </p>
        <Button onClick={onReset} variant="primary" size="lg" className="mt-6 w-full">
          Scanner le prochain
        </Button>
      </div>
    );
  }

  if (result.status === "USED") {
    return (
      <div className="rounded-lg border-2 border-error bg-coral-light p-6 text-center">
        <XCircle className="mx-auto h-12 w-12 text-error" />
        <h3 className="mt-4 font-display text-2xl font-bold text-error">QR déjà utilisé</h3>
        <p className="mt-2 text-sm">
          Utilisé le {new Date(result.usedAt).toLocaleString("fr-FR")}
        </p>
        <p className="mt-1 text-sm text-muted">Offre : {result.offer.name}</p>
        <p className="mt-4 text-xs text-muted">
          Le touriste peut générer un nouveau QR depuis son espace SmartPass.
        </p>
        <Button onClick={onReset} variant="secondary" size="lg" className="mt-6 w-full">
          Fermer
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 border-warning bg-warning/10 p-6 text-center">
      <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
      <h3 className="mt-4 font-display text-2xl font-bold text-warning">QR non valide</h3>
      <p className="mt-2 text-sm">
        <Badge variant="outline">{result.status}</Badge>
      </p>
      <Button onClick={onReset} variant="secondary" size="lg" className="mt-6 w-full">
        Fermer
      </Button>
    </div>
  );
}
