import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { FleetCinematicHero } from "@/components/FleetCinematicHero";
import { VehicleCard } from "@/components/VehicleCard";
import { getVehicles } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fleet — Rent a Car in Batkhela",
  description:
    "Browse available cars for rent in Batkhela: Toyota Yaris, Honda Civic, Prado, Hilux and more. Clear daily rates in Rs. Book online with AK Rent A Car.",
  alternates: { canonical: "/fleet" },
  openGraph: {
    title: "Fleet — Rent a Car in Batkhela | AK Rent A Car",
    description:
      "Available vehicles with clear daily rates. Pickup in Batkhela for city and tourism trips.",
    url: "/fleet",
  },
};

const HERO_IDS = ["v1", "v8", "v5", "v6", "v2", "v7"];

export default async function FleetPage() {
  const vehicles = await getVehicles();
  const heroSlides = HERO_IDS.map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
    .map((v) => ({
      src: v.image,
      alt: `${v.year} ${v.brand} ${v.name}`,
    }));
  const slides =
    heroSlides.length > 0
      ? heroSlides
      : vehicles.slice(0, 8).map((v) => ({
          src: v.image,
          alt: `${v.year} ${v.brand} ${v.name}`,
        }));

  return (
    <div className="site-noise min-h-screen">
      <section className="relative min-h-[78svh] overflow-hidden border-b border-white/10 sm:min-h-[85svh]">
        <FleetCinematicHero slides={slides} />
        <SiteHeader />

        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:min-h-[85svh] sm:px-6 sm:pb-20 sm:pt-32">
          <p className="animate-rise text-[10px] uppercase tracking-[0.22em] text-copper sm:text-xs sm:tracking-[0.28em]">
            AK Rent A Car &amp; Tourism Company
          </p>
          <h1 className="animate-rise-delay mt-3 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl">
            Rent a car in Batkhela
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl text-sm leading-relaxed text-fog/90 sm:mt-5 sm:text-lg">
            Your trusted fleet — clear rates in Rs per day. Pickup
            near Waseem Medical Complex, opposite Shesho Masjid.
          </p>
          <div className="animate-rise-delay-2 mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a
              href="#fleet-list"
              className="bg-copper px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-copper-bright sm:px-6 sm:py-3"
            >
              Browse cars
            </a>
            <a
              href="/#contact"
              className="border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-copper/60 sm:px-6 sm:py-3"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>

      <main id="fleet-list" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
