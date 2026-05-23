import { PartnerCategory } from "@/lib/enums";

export const CATEGORY_LABEL: Record<PartnerCategory, string> = {
  RESTAURATION: "Restauration",
  SURF_SPORT: "Surf & Sport",
  TRANSPORT: "Transport",
  EXCURSIONS: "Excursions",
  HEBERGEMENT: "Hébergement",
  LOCATION_VOITURE: "Location voiture",
  BIEN_ETRE: "Bien-être",
  CULTURE: "Culture",
  SHOPPING: "Shopping",
};

export const CATEGORY_EMOJI: Record<PartnerCategory, string> = {
  RESTAURATION: "🍽️",
  SURF_SPORT: "🌊",
  TRANSPORT: "🚐",
  EXCURSIONS: "🐪",
  HEBERGEMENT: "🏨",
  LOCATION_VOITURE: "🚗",
  BIEN_ETRE: "💆",
  CULTURE: "🎨",
  SHOPPING: "🛍️",
};

export const CITIES = [
  "Agadir",
  "Marrakech",
  "Essaouira",
  "Taghazout",
  "Ouarzazate",
  "Casablanca",
] as const;
