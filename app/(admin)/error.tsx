"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-lg rounded-lg border border-error/30 bg-white p-6">
        <h2 className="font-display text-xl font-bold text-error">Erreur Admin</h2>
        <p className="mt-2 text-sm text-charcoal/80">{error.message}</p>
        {error.digest && (
          <p className="mt-1 font-mono text-xs text-muted">Digest: {error.digest}</p>
        )}
        <pre className="mt-4 max-h-40 overflow-auto rounded bg-stone p-3 text-xs text-charcoal/70">
          {error.stack}
        </pre>
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-coral px-4 py-2 text-sm font-medium text-white"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
