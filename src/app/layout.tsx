import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AK Rent A Car & Tourism Company — Batkhela",
  description:
    "Your trusted place for car rental and tourism in Batkhela, Khyber Pakhtunkhwa. Near Waseem Medical Complex, opposite Shesho Masjid.",
  icons: {
    icon: "/logo-ak.png?v=3",
    apple: "/logo-ak.png?v=3",
  },
};

// Fleet/admin pages read MongoDB at request time — do not prerender at build.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
