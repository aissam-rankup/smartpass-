// SQLite has no enum support, so we maintain the same values as TS string unions.
// These mirror what the Prisma enums were before the SQLite migration.

export const Role = {
  TOURIST: "TOURIST",
  PARTNER: "PARTNER",
  ADMIN: "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const SubStatus = {
  ACTIVE: "ACTIVE",
  CANCELED: "CANCELED",
  PAST_DUE: "PAST_DUE",
  TRIALING: "TRIALING",
  INCOMPLETE: "INCOMPLETE",
} as const;
export type SubStatus = (typeof SubStatus)[keyof typeof SubStatus];

export const QRStatus = {
  ACTIVE: "ACTIVE",
  USED: "USED",
  EXPIRED: "EXPIRED",
  REVOKED: "REVOKED",
} as const;
export type QRStatus = (typeof QRStatus)[keyof typeof QRStatus];

export const PartnerCategory = {
  RESTAURATION: "RESTAURATION",
  SURF_SPORT: "SURF_SPORT",
  TRANSPORT: "TRANSPORT",
  EXCURSIONS: "EXCURSIONS",
  HEBERGEMENT: "HEBERGEMENT",
  LOCATION_VOITURE: "LOCATION_VOITURE",
  BIEN_ETRE: "BIEN_ETRE",
  CULTURE: "CULTURE",
  SHOPPING: "SHOPPING",
} as const;
export type PartnerCategory = (typeof PartnerCategory)[keyof typeof PartnerCategory];

// Helpers for comma-separated array fields
export const csv = {
  split: (s?: string | null): string[] =>
    s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [],
  join: (arr: string[]): string => arr.filter(Boolean).join(","),
};
