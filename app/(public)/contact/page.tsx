import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Support SmartPass & Partenariats",
  description:
    "Une question, un litige avec un partenaire, ou vous souhaitez rejoindre SmartPass en tant que partenaire ? Contactez-nous.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-px py-16">
      <h1 className="font-display text-4xl font-bold">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Notre équipe vous répond généralement sous 24h. Pour les partenariats commerciaux,
        mentionnez "Partenariat" dans votre message.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <a
          href="mailto:support@smartpass.ma"
          className="rounded-lg border border-border bg-white p-6 transition hover:border-coral"
        >
          <Mail className="h-6 w-6 text-coral" />
          <h3 className="mt-4 font-display text-lg font-semibold">Support touristes</h3>
          <p className="mt-1 text-sm text-muted">
            Litige, question sur votre Smart Pass, problème de QR code.
          </p>
          <p className="mt-3 text-sm font-medium text-coral">support@smartpass.ma</p>
        </a>

        <a
          href="mailto:partners@smartpass.ma"
          className="rounded-lg border border-border bg-white p-6 transition hover:border-coral"
        >
          <MessageSquare className="h-6 w-6 text-coral" />
          <h3 className="mt-4 font-display text-lg font-semibold">Devenir partenaire</h3>
          <p className="mt-1 text-sm text-muted">
            Vous gérez un commerce, un service touristique au Maroc ? Rejoignez SmartPass.
          </p>
          <p className="mt-3 text-sm font-medium text-coral">partners@smartpass.ma</p>
        </a>
      </div>
    </div>
  );
}
