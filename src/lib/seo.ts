import {
  BUSINESS_EMAIL,
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  BUSINESS_TAGLINE,
  CONTACTS,
} from "@/lib/format";

/** Custom domain; override with SITE_URL or NEXT_PUBLIC_SITE_URL if needed. */
export const DEFAULT_SITE_URL = "https://akrentacar.com";

export function getSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

export const SEO = {
  name: BUSINESS_NAME,
  tagline: BUSINESS_TAGLINE,
  location: BUSINESS_LOCATION,
  email: BUSINESS_EMAIL,
  defaultTitle: `${BUSINESS_NAME} — Rent a Car in Batkhela`,
  defaultDescription:
    "Rent a car in Batkhela, Khyber Pakhtunkhwa. Daily rates on Toyota, Honda & more. Tourism trips across Pakistan. Near Waseem Medical Complex, opposite Shesho Masjid.",
  keywords: [
    "rent a car Batkhela",
    "car rental Batkhela",
    "rent car Khyber Pakhtunkhwa",
    "AK Rent A Car",
    "car hire Batkhela",
    "tourism car rental Pakistan",
    "Toyota rental Batkhela",
    "Honda Civic rent Batkhela",
  ],
  ogImage: "/vehicles/civic-2017-black.png",
} as const;

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localBusinessJsonLd() {
  const phones = CONTACTS.flatMap((c) =>
    c.phones.map((p) => `+${p.whatsapp}`)
  );

  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: BUSINESS_NAME,
    description: SEO.defaultDescription,
    url: getSiteUrl(),
    email: BUSINESS_EMAIL,
    telephone: phones[0],
    image: absoluteUrl("/logo-ak.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Waseem Medical Complex, opposite Shesho Masjid",
      addressLocality: "Batkhela",
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Khyber Pakhtunkhwa, Pakistan",
    },
    priceRange: "Rs",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  };
}
