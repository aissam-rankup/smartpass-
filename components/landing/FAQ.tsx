import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const FAQ_ITEMS = [
  {
    q: "Combien coûte le Smart Pass et comment fonctionne le paiement ?",
    a: "Le Smart Pass coûte 299 DH en un seul paiement. C'est un paiement unique (pas d'abonnement, pas de prélèvement automatique). Votre Pass est valable pendant 2 mois à partir de l'achat.",
  },
  {
    q: "Que se passe-t-il après les 2 mois ?",
    a: "Rien — votre Pass expire simplement, aucun renouvellement automatique. Si vous souhaitez en profiter à nouveau, vous pouvez racheter un Smart Pass quand vous voulez pour 2 mois supplémentaires.",
  },
  {
    q: "Comment fonctionne SmartPass au Maroc ?",
    a: "SmartPass vous donne accès aux tarifs officiels de nos partenaires certifiés. Vous générez un QR code par offre, le partenaire le scanne, et vous payez le prix réduit affiché.",
  },
  {
    q: "Les réductions SmartPass sont-elles vraiment appliquées par les partenaires ?",
    a: "Oui — chaque partenaire signe un engagement contractuel d'appliquer le tarif SmartPass affiché. En cas de non-respect, le partenaire est retiré de la plateforme.",
  },
  {
    q: "Puis-je utiliser SmartPass dans plusieurs villes du Maroc ?",
    a: "Absolument. Votre Pass vous donne accès à tous les partenaires des 6 villes couvertes : Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate et Casablanca.",
  },
  {
    q: "Comment utiliser mon QR code chez un partenaire ?",
    a: "Ouvrez l'offre dans votre espace SmartPass, générez le QR, et montrez-le au partenaire au moment du paiement. Le partenaire scanne le code, le tarif réduit s'applique automatiquement.",
  },
  {
    q: "Un QR code peut-il être utilisé plusieurs fois ?",
    a: "Chaque QR code est à usage unique pour des raisons de sécurité. Mais vous pouvez générer un nouveau QR pour la même offre autant de fois que vous le souhaitez tant que votre Pass est actif.",
  },
  {
    q: "SmartPass est-il disponible en anglais, espagnol, allemand ?",
    a: "Oui — l'interface est traduite en FR, EN, ES, DE, et AR. Les descriptions de chaque partenaire sont aussi traduites.",
  },
  {
    q: "Quelles sont les villes couvertes par SmartPass ?",
    a: "Agadir, Marrakech, Essaouira, Taghazout, Ouarzazate et Casablanca. D'autres villes sont en cours d'intégration.",
  },
  {
    q: "SmartPass est-il remboursable ?",
    a: "Oui. Si vous n'êtes pas satisfait dans les 7 jours suivant votre achat, contactez-nous pour un remboursement intégral.",
  },
  {
    q: "Comment devenir partenaire SmartPass ?",
    a: "Rendez-vous sur la page Contact et précisez 'Partenariat' dans votre message. Notre équipe revient vers vous sous 48h.",
  },
];

export function FAQ() {
  return (
    <section className="container-px py-14 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-stone px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
