// ─────────────────────────────────────────────────────────────────────────────
// Casse-Croûte chez Ti-Pit — single source of truth for business info.
// Edit this file to update hours, phone, address, socials, payment or the logo.
// NAP (name / address / phone) must match the Google Business Profile exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  day: DayKey;
  /** 24h "HH:MM", or null when closed */
  open: string | null;
  close: string | null;
}

const address = {
  street: "163, 3e Avenue",
  locality: "Val-d'Or",
  region: "QC",
  postalCode: "J9P 1R6",
  country: "CA",
};

const fullAddress = `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
const mapsQuery = encodeURIComponent(`Casse-Croûte chez Ti-Pit, ${fullAddress}`);

export const siteConfig = {
  name: "Casse-Croûte chez Ti-Pit",
  // TODO: confirm the production domain before launch (canonical, hreflang, sitemap, OG).
  url: "https://cassecroutecheztipit.ca",

  phone: {
    display: "(819) 825-1517",
    href: "tel:+18198251517",
    e164: "+18198251517",
  },

  email: "cassecroutetipit@hotmail.com",

  address: {
    ...address,
    full: fullAddress,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    embedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  },

  geo: { latitude: 48.100262, longitude: -77.773186 },

  social: {
    // Leave blank to hide the icons and drop it from schema sameAs.
    facebook: "https://www.facebook.com/cassecroutecheztipit/",
  },

  // Google Business Profile
  // count      = exact number, used ONLY in the JSON-LD schema (must be numeric)
  // countLabel = what visitors see everywhere ("350+ avis Google")
  rating: { value: 4.4, count: 384, countLabel: "350+" },
  priceRange: "$$", // ~$10–20 per person

  // ── Payment ───────────────────────────────────────────────────────────────
  // cashOnly: shows "Argent comptant seulement — guichet automatique sur place"
  // in the call card, hours board, menu page and footer.
  // If they start taking debit: set cashOnly to false and update `accepted`
  // (e.g. ["Cash", "Debit Card"]). The note disappears everywhere at once.
  payment: {
    cashOnly: true,
    accepted: ["Cash"],
  },

  // ── Logo ──────────────────────────────────────────────────────────────────
  // Drop the file in /public/images and set src + its intrinsic pixel size.
  // While null, a typographic wordmark (styled after the sign) is shown instead.
  logo: null as null | { src: string; width: number; height: number },
  // e.g. logo: { src: "/images/logo.png", width: 600, height: 240 },

  // ── Hours ─────────────────────────────────────────────────────────────────
  // PLACEHOLDER — confirm with the owner, then set hoursConfirmed to true.
  // While false: a "to be confirmed" note is shown and hours are left OUT of
  // the JSON-LD schema (wrong hours in schema are worse than none).
  hoursConfirmed: false,
  hours: [
    { day: "monday", open: null, close: null },
    { day: "tuesday", open: "11:00", close: "19:00" },
    { day: "wednesday", open: "11:00", close: "19:00" },
    { day: "thursday", open: "11:00", close: "19:00" },
    { day: "friday", open: "11:00", close: "19:00" },
    { day: "saturday", open: "11:00", close: "19:00" },
    { day: "sunday", open: null, close: null },
  ] as DayHours[],
};

export type SiteConfig = typeof siteConfig;
