import { PrismaClient } from "@prisma/client";
import { PartnerCategory, Role } from "../lib/enums";

const prisma = new PrismaClient();

async function main() {
  // Admin
  await prisma.user.upsert({
    where: { email: "admin@smartpass.ma" },
    update: { role: Role.ADMIN },
    create: { email: "admin@smartpass.ma", name: "SmartPass Admin", role: Role.ADMIN },
  });

  // Sample partners
  const partners = [
    {
      slug: "ocean-surf-school-taghazout",
      name: "Ocean Surf School",
      description:
        "École de surf certifiée à Taghazout. Cours pour tous niveaux, matériel inclus, moniteurs expérimentés et bilingues.",
      category: PartnerCategory.SURF_SPORT,
      city: "Taghazout",
      address: "Plage de Taghazout, Maroc",
      phone: "+212 600 000 000",
      isVerified: true,
      coverImageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200",
      offers: [
        {
          name: "Cours de surf découverte (2h)",
          description: "Cours débutant avec moniteur, planche et combinaison incluses.",
          tags: "Débutants,Matériel inclus,2 heures",
          normalPrice: 600,
          reducedPrice: 250,
        },
        {
          name: "Pack 5 cours",
          description: "Forfait 5 séances pour progression rapide.",
          tags: "Tous niveaux,Pack avantage",
          normalPrice: 2500,
          reducedPrice: 1100,
        },
      ],
    },
    {
      slug: "riad-jasmin-marrakech",
      name: "Riad Jasmin",
      description:
        "Riad traditionnel au cœur de la médina de Marrakech. Patio fleuri, hammam, terrasse panoramique.",
      category: PartnerCategory.HEBERGEMENT,
      city: "Marrakech",
      address: "Médina, Marrakech",
      isVerified: true,
      coverImageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200",
      offers: [
        {
          name: "Nuit + petit-déjeuner",
          description: "Chambre double avec petit-déjeuner marocain inclus.",
          tags: "Petit-déj inclus,Médina",
          normalPrice: 850,
          reducedPrice: 480,
        },
      ],
    },
    {
      slug: "taxi-pro-agadir",
      name: "Taxi Pro Agadir",
      description:
        "Service de transferts officiel à Agadir. Voitures propres, chauffeurs professionnels, tarifs fixes.",
      category: PartnerCategory.TRANSPORT,
      city: "Agadir",
      phone: "+212 611 000 000",
      isVerified: true,
      coverImageUrl: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200",
      offers: [
        {
          name: "Transfert aéroport → hôtel",
          description: "Trajet direct depuis l'aéroport Al Massira, voiture climatisée.",
          tags: "Aéroport,Fixe",
          normalPrice: 300,
          reducedPrice: 90,
        },
      ],
    },
    {
      slug: "saveurs-essaouira",
      name: "Saveurs d'Essaouira",
      description:
        "Restaurant familial au port d'Essaouira. Spécialités de poissons frais grillés, ambiance authentique.",
      category: PartnerCategory.RESTAURATION,
      city: "Essaouira",
      isVerified: true,
      coverImageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
      offers: [
        {
          name: "Menu poisson du jour",
          description: "Salade, poisson grillé, dessert et thé à la menthe.",
          tags: "Poisson,Menu complet",
          normalPrice: 280,
          reducedPrice: 140,
        },
      ],
    },
  ];

  for (const p of partners) {
    const { offers, ...partnerData } = p;
    await prisma.partner.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...partnerData,
        offers: { create: offers },
      },
    });
    console.log("Seeded partner:", p.slug);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
