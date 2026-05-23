import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="container-px flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8">
        <h1 className="font-display text-2xl font-bold">Connexion</h1>
        <p className="mt-2 text-sm text-muted">
          Recevez un lien magique par email ou connectez-vous avec Google.
        </p>

        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", { email: formData.get("email") as string, redirectTo: "/dashboard" });
          }}
          className="mt-6 space-y-3"
        >
          <Input name="email" type="email" required placeholder="votre@email.com" />
          <Button type="submit" className="w-full">
            Recevoir mon lien magique
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <Button type="submit" variant="secondary" className="w-full">
            Continuer avec Google
          </Button>
        </form>
      </div>
    </div>
  );
}
