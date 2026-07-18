export function formatPKR(amount: number) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export const BUSINESS_NAME = "AK Rent A Car & Tourism Company";

export const BUSINESS_TAGLINE =
  "Your trusted place for car rental and travel in Batkhela";

export const BUSINESS_LOCATION =
  "Near Waseem Medical Complex, opposite Shesho Masjid, Batkhela, Khyber Pakhtunkhwa, Pakistan";

export const BUSINESS_EMAIL = "akrentacar19@gmail.com";

export const BUSINESS_EMAILS = [
  "akrentacar19@gmail.com",
  "tameerkhan0009@gmail.com",
] as const;

export const CONTACTS = [
  {
    name: "Momin Khan",
    phones: [
      {
        label: "+92 300 5181628",
        display: "+92 300 5181628",
        whatsapp: "923005181628",
      },
      {
        label: "0333 3323394",
        display: "0333 3323394",
        whatsapp: "923333323394",
      },
    ],
  },
  {
    name: "Tamer Khan",
    phones: [
      {
        label: "0347 8226649",
        display: "0347 8226649",
        whatsapp: "923478226649",
      },
    ],
  },
] as const;

export function whatsappUrl(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const PICKUP_LOCATIONS = [
  "Office — Near Waseem Medical Complex, Batkhela",
  "Shesho Masjid area, Batkhela",
  "Batkhela City Center",
  "Hotel / home delivery (Batkhela)",
] as const;
