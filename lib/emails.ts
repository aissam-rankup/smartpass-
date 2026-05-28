import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM_EMAIL || "SmartPass <noreply@smartpass.ma>";

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn("[email] Resend not configured. Would have sent:", { to, subject });
    return;
  }
  await resend.emails.send({ from: FROM, to, subject, html });
}

function wrap(content: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;background:#f7f3ec;font-family:'DM Sans',sans-serif;color:#1a1a18;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #d3cfc6;">
    <div style="background:#1a1a18;padding:24px;color:#f7f3ec;">
      <h1 style="margin:0;font-size:22px;font-weight:700;">SmartPass</h1>
      <p style="margin:4px 0 0;color:#888780;font-size:12px;">Voyagez au Maroc. Au vrai prix.</p>
    </div>
    <div style="padding:32px;line-height:1.6;">${content}</div>
    <div style="background:#ede8df;padding:16px;text-align:center;font-size:11px;color:#888780;">
      © ${new Date().getFullYear()} SmartPass Maroc · noreply@smartpass.ma
    </div>
  </div>
</body></html>`;
}

export const emails = {
  welcome: (to: string, name?: string) =>
    send(
      to,
      "Bienvenue sur SmartPass 🛡️ — Votre guide anti-arnaque au Maroc",
      wrap(`
        <h2 style="font-size:24px;margin:0 0 12px;">Bienvenue${name ? ` ${name}` : ""} !</h2>
        <p>Vous venez de rejoindre 1 284 voyageurs qui parcourent le Maroc au tarif local.</p>
        <p><strong>Pour commencer :</strong></p>
        <ol>
          <li>Activez votre Smart Pass ($29.99 en paiement unique, valable 2 mois)</li>
          <li>Explorez le catalogue de 47 partenaires certifiés</li>
          <li>Générez vos QR codes et économisez immédiatement</li>
        </ol>
        <p style="margin-top:24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/smart-pass" style="background:#d85a30;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">
            Activer mon Pass
          </a>
        </p>
      `)
    ),

  subscriptionConfirmed: (to: string) =>
    send(
      to,
      "SmartPass activé ✓ — 47 partenaires vous attendent",
      wrap(`
        <h2 style="font-size:24px;margin:0 0 12px;">Votre Smart Pass est actif !</h2>
        <p>Vous pouvez maintenant générer des QR codes pour tous nos partenaires certifiés.</p>
        <p style="margin-top:24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/partenaires" style="background:#d85a30;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">
            Voir les partenaires
          </a>
        </p>
        <p style="margin-top:24px;color:#888780;font-size:13px;">
          Astuce : commencez par les transferts d'aéroport — c'est là où les économies sont les plus immédiates.
        </p>
      `)
    ),

  subscriptionCanceled: (to: string) =>
    send(
      to,
      "Votre Smart Pass est annulé — On espère vous revoir",
      wrap(`
        <h2 style="font-size:24px;margin:0 0 12px;">Annulation confirmée</h2>
        <p>Vous gardez l'accès à toutes les fonctionnalités jusqu'à la fin de votre période payée.</p>
        <p>Vous nous manquerez. Vous pouvez réactiver votre Pass à tout moment.</p>
        <p style="margin-top:24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/smart-pass" style="background:#1d9e75;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">
            Réactiver
          </a>
        </p>
      `)
    ),

  paymentFailed: (to: string) =>
    send(
      to,
      "⚠️ Paiement échoué — Votre Smart Pass est suspendu",
      wrap(`
        <h2 style="font-size:24px;margin:0 0 12px;">Problème de paiement</h2>
        <p>Nous n'avons pas pu finaliser votre paiement. Votre Pass n'a pas été activé.</p>
        <p>Mettez à jour votre moyen de paiement pour réactiver l'accès :</p>
        <p style="margin-top:24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background:#d85a30;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">
            Mettre à jour
          </a>
        </p>
      `)
    ),
};
