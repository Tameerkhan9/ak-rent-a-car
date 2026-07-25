import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { FleetCinematicHero } from "@/components/FleetCinematicHero";
import { VehicleCard } from "@/components/VehicleCard";
import { getVehicles } from "@/lib/data";

export const dynamic = "force-dynamic";

const HERO_IDS = ["v1", "v8", "v5", "v6", "v10", "v2"];

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

        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 sm:min-h-[85svh] sm:pb-20">
          <p className="animate-rise text-xs uppercase tracking-[0.28em] text-copper">
            AK Rent A Car &amp; Tourism Company
          </p>
          <h1 className="animate-rise-delay mt-4 max-w-3xl font-[family-name:var(--font-syne)] text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Available vehicles
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-fog/90 sm:text-lg">
            Your trusted fleet in Batkhela — clear rates in Rs per day. Pickup
            near Waseem Medical Complex, opposite Shesho Masjid.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#fleet-list"
              className="bg-copper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-copper-bright"
            >
              Browse cars
            </a>
            <a
              href="/#contact"
              className="border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-copper/60"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>

      <main id="fleet-list" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
