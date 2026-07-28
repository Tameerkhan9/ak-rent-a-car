import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { getSiteUrl, localBusinessJsonLd, SEO } from "@/lib/seo";
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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SEO.defaultTitle,
    template: `%s — ${SEO.name}`,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  applicationName: SEO.name,
  authors: [{ name: SEO.name }],
  creator: SEO.name,
  publisher: SEO.name,
  category: "Car rental",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: SEO.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: "Rent a car in Batkhela — AK Rent A Car fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
  const jsonLd = localBusinessJsonLd();

  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
